import mapController from '@api/mapController';
import authController from '@api/authController';
import userController from '@api/userController';
import reviewController from '@api/reviewController';
import rankController from '@api/rankController';

import express, { Request, Response } from 'express';

const router: express.Router = express.Router();

router.use('/map', mapController);
router.use('/user', userController);
router.use('/auth', authController);
router.use('/review', reviewController);
router.use('/rank', rankController);

export default router;
