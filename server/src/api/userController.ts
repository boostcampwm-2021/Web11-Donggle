import { userService } from '@services/index';

import express, { Request, RequestHandler, Response } from 'express';
import multer from 'multer';

interface ProfileImageBody {
  imageURL: string;
  username: string;
}

interface ProfileImageQuery {
  imageURL: string;
  username: string;
}

const upload = multer();

const router: express.Router = express.Router();

router.patch(
  '/profile-image',
  upload.single('image'),
  async (req: Request, res: Response) => {
    const body: ProfileImageBody = req.body as ProfileImageBody;
    const { username, imageURL: prevImageURL } = body;

    let imageURL = `${process.env.IMAGE_ENDPOINT as string}/${
      process.env.IMAGE_BUCKET as string
    }/user-profile.png`;
    if (req.file) {
      imageURL = await userService.patchProfileImage(
        username,
        prevImageURL,
        req.file,
      );
    }

    res.json({ imageURL });
  },
);

router.delete('/profile-image', (async (req: Request, res: Response) => {
  const query = req.query;
  const { username, imageURL } = query;

  if (username && imageURL) {
    await userService.deleteProfileImage(
      username as string,
      imageURL as string,
    );
  }

  res.json({
    imageURL: `${process.env.IMAGE_ENDPOINT as string}/${
      process.env.IMAGE_BUCKET as string
    }/user-profile.png`,
  });
}) as RequestHandler);

export default router;
