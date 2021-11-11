import mapController from '@api/mapController';
import authController from '@api/authController';
<<<<<<< HEAD
import reviewController from '@api/reviewController';
=======
import userController from '@api/userController';
>>>>>>> Feat: #69 - 이미지 등록 API 구현

import express, { Request, Response } from 'express';

const router: express.Router = express.Router();

router.use('/map', mapController);
router.use('/user', userController);

router.use('/auth', authController);

router.use('/review', reviewController);

export default router;
