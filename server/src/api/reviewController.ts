import { reviewService } from '@services/index';
import { Review, ReviewModel } from '@models/Review';
import logger from '@loaders/loggerLoader';

import express, { Request, Response } from 'express';

const router: express.Router = express.Router();
router.post('/initialize', reviewService.initializeReviewModel);
router.post('/', reviewService.insertReview);

export default router;
