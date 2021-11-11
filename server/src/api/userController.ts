import { User, UserModel } from '@models/User';

import express, { Request, RequestHandler, Response } from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import { v4 } from 'uuid';

interface ProfileImageBody {
  imageURL: string;
  username: string;
}

const upload = multer();
const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(process.env.IMAGE_ENDPOINT as string),
  region: 'kr-standard',
  credentials: {
    accessKeyId: process.env.IMAGE_ACCESSKEY as string,
    secretAccessKey: process.env.IMAGE_SECRETACCESSKEY as string,
  },
});

const router: express.Router = express.Router();

router.patch(
  '/profile-image',
  upload.single('image'),
  async (req: Request, res: Response) => {
    const body: ProfileImageBody = req.body as ProfileImageBody;
    const imageName = v4();
    const imageLink = `${process.env.IMAGE_ENDPOINT as string}/${
      process.env.IMAGE_BUCKET as string
    }/${imageName}.png`;

    try {
      await s3
        .putObject({
          Bucket: process.env.IMAGE_BUCKET as string,
          Key: `${imageName}.png`,
          ACL: 'public-read',
          Body: req.file?.buffer,
          ContentType: 'image/png',
        })
        .promise();

      const username = body.username;
      const prevImageURL = body.imageURL;
      const prevImageName = prevImageURL.replace(
        `${process.env.IMAGE_ENDPOINT as string}/${
          process.env.IMAGE_BUCKET as string
        }/`,
        '',
      );
      await UserModel.updateOne({ oauthEmail: username }, { image: imageLink });
      await s3
        .deleteObject({
          Bucket: process.env.IMAGE_BUCKET as string,
          Key: prevImageName,
        })
        .promise();

      res.json({
        imageLink,
      });
    } catch (err) {
      res.json({ imageLink: '' });
    }
  },
);

router.delete('/profile-image', (async (req: Request, res: Response) => {
  const body: ProfileImageBody = req.body as ProfileImageBody;
  const username = body.username;
  const imageURL = body.imageURL;
  const imageName = imageURL.replace(
    `${process.env.IMAGE_ENDPOINT as string}/${
      process.env.IMAGE_BUCKET as string
    }/`,
    '',
  );

  await UserModel.updateOne({ oauthEmail: username }, { image: '' });
  await s3
    .deleteObject({
      Bucket: process.env.IMAGE_BUCKET as string,
      Key: imageName,
    })
    .promise();

  res.json({ imageLink: '' });
}) as RequestHandler);

export default router;
