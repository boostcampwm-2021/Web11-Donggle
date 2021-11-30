import { userService } from '@services/index';
import { makeApiResponse } from '@utils/index';
import createCustomError from '@utils/error';

import express, {
  Request,
  RequestHandler,
  Response,
  NextFunction,
} from 'express';
import multer from 'multer';
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
  async (req: Request, res: Response, next: NextFunction) => {
    const body: ProfileImageBody = req.body as ProfileImageBody;
    const { oauth_email, image: prevImage } = body;

    if (oauth_email && req.file) {
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
        return next(createCustomError('InternalServerError', err));
      }
    } else {
      return next(
        createCustomError(
          'BadRequest',
          new Error('프로필 이미지 업데이트에 필요한 정보가 없습니다.'),
        ),
      );
    }
  },
);

router.delete('/profile-image', (async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const query = req.query;
  const { oauth_email, image } = query;

  if (oauth_email && image) {
    try {
      await userService.deleteProfileImage(
        oauth_email as string,
        image as string,
      );
      res
        .status(200)
        .json(makeApiResponse('', '성공적으로 이미지를 삭제했어요.'));
    } catch (error) {
      const err = error as Error;
      return next(createCustomError('InternalServerError', err));
    }
  } else {
    return next(
      createCustomError(
        'BadRequest',
        new Error('유저 정보, 이미지가 비었습니다!'),
      ),
    );
  }
}) as RequestHandler);

router.patch('/profile-address', (async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
          .json(makeApiResponse(address, '주소 업데이트에 성공했어요.'));
      } else {
        return next(
          createCustomError(
            'BadRequest',
            new Error('주소 업데이트에 실패했습니다!'),
          ),
        );
      }
    } catch (error) {
      const err = error as Error;
      return next(createCustomError('InternalServerError', err));
    }
  } else {
    return next(
      createCustomError(
        'BadRequest',
        new Error('유저 정보, 이메일이 비었습니다!'),
      ),
    );
  }
}) as RequestHandler);

export default router;
