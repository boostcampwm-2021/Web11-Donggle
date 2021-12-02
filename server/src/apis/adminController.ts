import { updateMapService, reviewService, dummyService } from '@services/index';
import configs from '@configs/index';
import { AdminRequest } from '@myTypes/Admin';
import { makeApiResponse } from '@utils/index';
import createCustomError from '@utils/error';
import logger from '@loaders/loggerLoader';
import express, { Response, NextFunction, RequestHandler } from 'express';

const router: express.Router = express.Router();

router.post(
  '/map-data',
  (req: AdminRequest, res: Response, next: NextFunction) => {
    try {
      if (req.body.password === configs.admin_password) {
        void updateMapService.populateMapAndSimpleMap();
        res
          .status(201)
          .json(makeApiResponse({}, '경계좌표를 새로 저장하는 중입니다.'));
      } else {
        return next(
          createCustomError(
            'NotFound',
            new Error(
              'Admin 암호가 잘못되어 Map 정보를 업데이트 하지 못했습니다.',
            ),
          ),
        );
      }
    } catch (error) {
      const err = error as Error;
      return next(createCustomError('InternalServerError', err));
    }
  },
);

router.post('/review', (async (
  req: AdminRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.body.password === configs.admin_password) {
      if (req.body.type === 'Drop') {
        await reviewService.dropModel();
      }
      await reviewService.initializeReviewModel();
    } else {
      return next(
        createCustomError(
          'NotFound',
          new Error('Review Model 초기화 중 오류가 발생했습니다.'),
        ),
      );
    }
    res
      .status(201)
      .json(
        makeApiResponse({}, 'Review Model이 정상적으로 초기화 되었습니다.'),
      );
  } catch (error) {
    const err = error as Error;
    next(createCustomError('InternalServerError', err));
  }
}) as RequestHandler);

router.post('/dummyUser', (async (req: AdminRequest, res: Response) => {
  const { password } = req.body;
  try {
    if (password === configs.admin_password) {
      await dummyService.populateUsers();
      res.status(200).json(makeApiResponse({}, 'Making Users!'));
    } else {
      res
        .status(404)
        .json(makeApiResponse({}, 'Sorry.. 404 NOT FOUND.... Good bye!'));
    }
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res.status(500).json(makeApiResponse({}, 'DB ACCESS FAILED!'));
  }
}) as RequestHandler);

router.post('/dummyRates', (async (req: AdminRequest, res: Response) => {
  const { password } = req.body;
  try {
    if (password === configs.admin_password) {
      await dummyService.populateReviews();
      res.status(200).json(makeApiResponse({}, 'HAHAHA!'));
    } else {
      res
        .status(404)
        .json(makeApiResponse({}, 'Sorry.. 404 NOT FOUND.... Good bye!'));
    }
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res.status(500).json(makeApiResponse({}, 'DB ACCESS FAILED!'));
  }
}) as RequestHandler);

export default router;
