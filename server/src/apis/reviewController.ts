import { reviewService } from '@services/index';
import { makeApiResponse } from '@utils/index';
import logger from '@loaders/loggerLoader';
import { AdminRequest } from '@myTypes/Admin';
import { ReviewInsertRequest, ReviewGetUserRequest } from '@myTypes/Review';
import config from 'configs/index';
import express, {
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from 'express';
import checkToken from '@middlewares/auth';
import createError from '@utils/error';

const router: express.Router = express.Router();

router.post('/initialize', (async (
  req: AdminRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.body.password === config.admin_password) {
      if (req.body.type === 'Drop') {
        await reviewService.dropModel();
      }
      await reviewService.initializeReviewModel();
    } else {
      return next(
        createError(
          'NotFound',
          new Error('Review Model 초기화 중 오류가 발생했습니다.').stack,
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
    next(createError('InternalServerError', err.stack));
  }
}) as RequestHandler);

router.get('/', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const address = req.query.address as string;
    const pageNum: number = parseInt(req.query.pageNum as string);
    const itemNum: number = parseInt(req.query.itemNum as string);
    if (!address)
      return next(
        createError(
          'NotFound',
          new Error('정상적이지 않은 요청입니다. Address 값 부재').stack,
        ),
      );
    const data = await reviewService.queryReviews(address, pageNum, itemNum);
    res.status(200).json(makeApiResponse(data, ''));
  } catch (error) {
    const err = error as Error;
    return next(createError('InternalServerError', err.stack));
  }
}) as RequestHandler);

router.get('/:id', checkToken, (async (
  req: ReviewGetUserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userEmail = req.id;
    const pageNum: number = parseInt(req.query.pageNum as string);
    const itemNum: number = parseInt(req.query.itemNum as string);
    if (!userEmail)
      return next(
        createError(
          'NotFound',
          new Error('정상적이지 않은 요청입니다. User Email 값 부재').stack,
        ),
      );
    const data = await reviewService.queryUserReviews(
      userEmail,
      pageNum,
      itemNum,
    );
    res.status(200).json(makeApiResponse(data, ''));
  } catch (error) {
    const err = error as Error;
    return next(createError('InternalServerError', err.stack));
  }
}) as RequestHandler);

router.post('/', checkToken, (async (
  req: ReviewInsertRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const insertData = req.body;
    if (!insertData)
      return next(
        createError(
          'BadRequest',
          new Error('비정상적인 후기 정보가 입력되었습니다.').stack,
        ),
      );
    await reviewService.insertReview(insertData);
    res
      .status(200)
      .json(makeApiResponse({}, '후기를 정상적으로 저장하였습니다.'));
  } catch (error) {
    const err = error as Error;
    return next(createError('InternalServerError', err.stack));
  }
}) as RequestHandler);

export default router;
