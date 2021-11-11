import { userService } from '@services/index';

import express, { Request, RequestHandler, Response } from 'express';
import multer from 'multer';

interface ProfileImageBody {
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
    const username = body.username;
    const prevImageURL = body.imageURL;

    let imageURL = '';
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
  const body: ProfileImageBody = req.body as ProfileImageBody;
  const username = body.username;
  const imageURL = body.imageURL;

  await userService.deleteProfileImage(username, imageURL);

  res.status(200).send();
}) as RequestHandler);

export default router;
