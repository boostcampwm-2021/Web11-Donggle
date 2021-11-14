import { userService } from '@services/index';

import express, { Request, RequestHandler, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

interface ProfileImageBody {
  image: string;
  oauth_email: string;
}

const validateFileType = (
  file: Express.Multer.File,
  callback: multer.FileFilterCallback,
) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extResult = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimeResult = allowedTypes.test(file.mimetype);
  if (extResult && mimeResult) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  fileFilter: (
    _,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback,
  ) => validateFileType(file, callback),
});

const router: express.Router = express.Router();

router.patch(
  '/profile-image',
  upload.single('file'),
  async (req: Request, res: Response) => {
    const body: ProfileImageBody = req.body as ProfileImageBody;
    const { oauth_email, image: prevImage } = body;

    let image = `${process.env.IMAGE_ENDPOINT as string}/${
      process.env.IMAGE_BUCKET as string
    }/user-profile.png`;
    if (req.file) {
      image = await userService.patchProfileImage(
        oauth_email,
        prevImage,
        req.file,
      );
    }

    res.json({ image });
  },
);

router.delete('/profile-image', (async (req: Request, res: Response) => {
  const query = req.query;
  const { oauth_email, image } = query;

  if (oauth_email && image) {
    await userService.deleteProfileImage(
      oauth_email as string,
      image as string,
    );
  }

  res.json({
    image: `${process.env.IMAGE_ENDPOINT as string}/${
      process.env.IMAGE_BUCKET as string
    }/user-profile.png`,
  });
}) as RequestHandler);

export default router;
