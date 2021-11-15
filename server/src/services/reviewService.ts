import logger from '@loaders/loggerLoader';
import { ReviewModel } from '@models/Review';
import { Request, Response, RequestHandler } from 'express';
import { Error } from 'mongoose';
// import { CategoryRateType } from '@types/';

interface CategoryRateType {
  categories: {
    safety: number;
    traffic: number;
    food: number;
    entertainment: number;
  };
}
interface ReviewRequest extends Request {
  body: {
    password: string;
    type: string;
  };
}

interface ReviewInsertRequest extends Request {
  body: {
    address: string;
    text: string;
    categories: CategoryRateType;
  };
}

const dropModel = async () => {
  await ReviewModel.collection
    .drop()
    .then((result) => {
      logger.info('Dropped review collection');
    })
    .catch((err) => {
      logger.error('Error! : ', err);
    });
};

const initializeReviewModel = (req: ReviewRequest, res: Response) => {
  if (req.body.password === process.env.ADMIN_PASSWORD) {
    if (req.body.type === 'Drop') {
      async () => await dropModel();
    }
    ReviewModel.collection
      .createIndex({ address: 'text' })
      .then(() => {
        logger.info('Initialized Review Model Successfully');
        res.status(200).json({ result: 'success' });
      })
      .catch((err: Error) => {
        logger.error(err);
        res.status(500).json({ result: 'fail', message: err });
      });
  }
};

const insertReview: RequestHandler = (
  req: ReviewInsertRequest,
  res: Response,
) => {
  const insertData = {
    address: req.body.address,
    text: req.body.text,
    rate: req.body.categories,
  };
  ReviewModel.create(insertData)
    .then(() => {
      logger.info('Inserted Review Successfully');
      res.status(200).json({ result: 'success' });
    })
    .catch((err: Error) => {
      logger.error(err);
      res.status(500).json({ result: 'fail', message: err });
    });
};

export default { dropModel, initializeReviewModel, insertReview };
