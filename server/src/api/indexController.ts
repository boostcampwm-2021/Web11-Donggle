import mapController from '@api/mapController';
import authController from '@api/authController';

import express, { Request, Response } from 'express';

const router: express.Router = express.Router();

router.use('/map', mapController);

router.use('/v1', authController);

export default router;
