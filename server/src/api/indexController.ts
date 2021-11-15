import mapController from '@api/mapController';
import authController from '@api/authController';
import reviewController from '@api/reviewController';

import express, { Request, Response } from 'express';

const router: express.Router = express.Router();

router.use('/map', mapController);

router.use('/auth', authController);

router.use('/review', reviewController);

export default router;
