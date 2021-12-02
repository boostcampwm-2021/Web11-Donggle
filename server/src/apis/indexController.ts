import mapController from '@apis/mapController';
import authController from '@apis/authController';
import userController from '@apis/userController';
import reviewController from '@apis/reviewController';

import express, { Request, Response } from 'express';

const router: express.Router = express.Router();

router.use('/map', mapController);
router.use('/user', userController);
router.use('/auth', authController);
router.use('/review', reviewController);

export default router;
