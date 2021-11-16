import { userService } from '@services/index';
import { makeApiResponse } from '@utils/index';
import logger from '@loaders/loggerLoader';

import express, { Request, RequestHandler, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

interface ProfileImageBody {
  image: string;
  oauth_email: string;
}

interface ProfileAddressBody {
  oauth_email: string;
  address: string;
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

    if (oauth_email && prevImage && req.file) {
      try {
        let image = `${process.env.IMAGE_ENDPOINT as string}/${
          process.env.IMAGE_BUCKET as string
        }/user-profile.png`;
        image = await userService.patchProfileImage(
          oauth_email,
          prevImage,
          req.file,
        );
        res
          .status(200)
          .json(makeApiResponse(image, '이미지를 성공적으로 업데이트했어요.'));
      } catch (error) {
        const err = error as Error;
        logger.error(err.message);
        res
          .status(500)
          .json(
            makeApiResponse({}, '이미지를 정상적으로 업데이트하지 못했어요.'),
          );
      }
    } else {
      res.status(500).json(makeApiResponse({}, '필요한 바디가 비었어요.'));
    }
  },
);

router.delete('/profile-image', (async (req: Request, res: Response) => {
  const query = req.query;
  const { oauth_email, image } = query;

  if (oauth_email && image) {
    try {
      const result = await userService.deleteProfileImage(
        oauth_email as string,
        image as string,
      );
      res
        .status(200)
        .json(makeApiResponse(result, '성공적으로 이미지를 삭제했어요.'));
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      res
        .status(500)
        .json(makeApiResponse({}, '이미지를 정상적으로 삭제하지 못했어요.'));
    }
  } else {
    res.status(500).json(makeApiResponse({}, '필요한 쿼리스트링이 비었어요.'));
  }

  res.json({
    image: `${process.env.IMAGE_ENDPOINT as string}/${
      process.env.IMAGE_BUCKET as string
    }/user-profile.png`,
  });
}) as RequestHandler);

router.patch('/profile-address', (async (req: Request, res: Response) => {
  const body: ProfileAddressBody = req.body as ProfileAddressBody;
  const { oauth_email, address } = body;
  if (oauth_email && address) {
    try {
      const updateResult = await userService.updateAddress(
        oauth_email,
        address,
      );
      if (updateResult) {
        res
          .status(200)
          .json(makeApiResponse({ address }, '주소 업데이트에 성공했어요.'));
      } else {
        res.status(200).json(makeApiResponse({}, '일치하는 아이디가 없어요.'));
      }
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      res
        .status(500)
        .json(makeApiResponse({}, '주소를 정상적으로 업데이트하지 못했어요.'));
    }
  } else {
    res.status(500).json(makeApiResponse({}, '필요한 바디가 비었어요.'));
  }
}) as RequestHandler);

export default router;
