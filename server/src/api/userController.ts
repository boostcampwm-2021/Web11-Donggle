import { userService } from '@services/index';

import express, { Request, RequestHandler, Response } from 'express';
import multer from 'multer';

interface ProfileImageBody {
  image: string;
  oauth_email: string;
}

interface ProfileImageQuery {
  image: string;
  oauth_email: string;
}

const upload = multer();

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
