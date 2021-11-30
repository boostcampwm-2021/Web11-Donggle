import logger from '@loaders/loggerLoader';
import { updateMapService } from '@services/index';
import config from 'configs/index';
import { AdminRequest } from '@myTypes/Admin';
import { makeApiResponse } from '@utils/index';
import createCustomError from '@utils/error';

import express, { Request, Response, NextFunction } from 'express';

const router: express.Router = express.Router();

router.post(
  '/map-data',
  (req: AdminRequest, res: Response, next: NextFunction) => {
    try {
      if (req.body.password === config.admin_password) {
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

export default router;
