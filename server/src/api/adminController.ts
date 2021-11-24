import logger from '@loaders/loggerLoader';
import { updateMapService } from '@services/index';
import config from '@config/index';
import { AdminRequest } from '@myTypes/Admin';
import { makeApiResponse } from '@utils/index';

import express, { Request, Response } from 'express';

const router: express.Router = express.Router();

router.post('/map-data', (req: AdminRequest, res: Response) => {
  try {
    if (req.body.password === config.admin_password) {
      void updateMapService.populateMapAndSimpleMap();
      res.status(200).json(makeApiResponse({}, 'HAHA!'));
    } else {
      res
        .status(404)
        .send(makeApiResponse({}, 'DAMN! 404 NOT FOUND... YOU MAD?'));
    }
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res.status(500).json(makeApiResponse({}, 'DB ACCESS FAILED!'));
  }
});

router.post('/rates', (req: AdminRequest, res: Response) => {
  const { password } = req.body;
  try {
    if (password === config.admin_password) {
      void updateMapService.populateMapInfos();
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
});

export default router;
