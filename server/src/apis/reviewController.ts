import { reviewService } from '@services/index';
import { makeApiResponse } from '@utils/index';
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
import createCustomError from '@utils/error';

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
        createCustomError(
          'NotFound',
          new Error('Review Model 초기화 중 오류가 발생했습니다.'),
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
    next(createCustomError('InternalServerError', err));
  }
}) as RequestHandler);

router.get('/', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const address = req.query.address as string;
    const pageNum: number = parseInt(req.query.pageNum as string);
    const itemNum: number = parseInt(req.query.itemNum as string);
    if (!address)
      return next(
        createCustomError(
          'BadRequest',
          new Error('정상적이지 않은 요청입니다. Address 값 부재'),
        ),
      );
    const data = await reviewService.queryReviews(address, pageNum, itemNum);
    res.status(200).json(makeApiResponse(data, ''));
  } catch (error) {
    const err = error as Error;
    return next(
      createCustomError(
        'InternalServerError',
        err,
        '서버 오류로 후기 정보를 받아오지 못했습니다.',
      ),
    );
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
        createCustomError(
          'BadRequest',
          new Error('정상적이지 않은 요청입니다. User Email 값 부재'),
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
    return next(
      createCustomError(
        'InternalServerError',
        err,
        '서버 오류로 후기 정보를 받아오지 못했습니다.',
      ),
    );
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
        createCustomError(
          'BadRequest',
          new Error('비정상적인 후기 정보가 입력되었습니다.'),
        ),
      );
    await reviewService.insertReview(insertData);
    res
      .status(201)
      .json(makeApiResponse({}, '후기를 정상적으로 저장하였습니다.'));
  } catch (error) {
    const err = error as Error;
    return next(
      createCustomError(
        'InternalServerError',
        err,
        '오류가 발생하여 후기를 저장하지 못했습니다.',
      ),
    );
  }
}) as RequestHandler);

export default router;
