import { reviewService } from '@services/index';
import { makeApiResponse } from '@utils/index';
import logger from '@loaders/loggerLoader';
import { ReviewRequest, ReviewInsertRequest } from '@myTypes/Review';
import config from '@config/index';
import express, { Request, Response, RequestHandler } from 'express';
import checkToken from '@middlewares/auth';

const router: express.Router = express.Router();

router.post('/initialize', (async (req: ReviewRequest, res: Response) => {
  try {
    if (req.body.password === config.admin_password) {
      if (req.body.type === 'Drop') {
        await reviewService.dropModel();
      }
      await reviewService.initializeReviewModel();
    } else {
      throw Error('관리자 암호가 잘못되었습니다.');
    }
    res
      .status(200)
      .json(
        makeApiResponse({}, 'Review Model이 정상적으로 초기화 되었습니다.'),
      );
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res
      .status(500)
      .json(makeApiResponse({}, 'Review Model 초기화 중 오류가 발생했습니다.'));
  }
}) as RequestHandler);

router.get('/', (async (req: Request, res: Response) => {
  try {
    const address = req.query.address as string;
    const pageNum: number = parseInt(req.query.pageNum as string);
    const itemNum: number = parseInt(req.query.itemNum as string);
    if (!address)
      throw new Error('정상적이지 않은 요청입니다. Address 값 부재');
    const data = await reviewService.queryReviews(address, pageNum, itemNum);
    res.status(200).json(makeApiResponse(data, ''));
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res
      .status(500)
      .json(makeApiResponse({}, '후기 정보를 가져오지 못했습니다.'));
  }
}) as RequestHandler);

router.post('/', checkToken, (async (
  req: ReviewInsertRequest,
  res: Response,
) => {
  try {
    const insertData = req.body;
    if (!insertData) throw Error('비정상적인 후기 정보가 입력되었습니다.');
    await reviewService.insertReview(insertData);
    void reviewService.updateMapInfoHashtag(
      insertData.address,
      insertData.hashtags as string[],
    );
    res
      .status(200)
      .json(makeApiResponse({}, '후기를 정상적으로 저장하였습니다.'));
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res
      .status(500)
      .json(makeApiResponse({}, '후기를 정상적으로 저장하지 못했습니다.'));
  }
}) as RequestHandler);

export default router;
