import { mapService } from '@services/index';
import { makeApiResponse, isRangeValid } from '@utils/index';
import logger from '@loaders/loggerLoader';
import express, { Request, Response, RequestHandler } from 'express';

const router: express.Router = express.Router();
const POLYGON_MAX_AGE = 60 * 60 * 1;

router.get('/polygon', (async (req: Request, res: Response) => {
  const address = req.query.address as string;
  const scope = req.query.scope as string;
  try {
    if (!isRangeValid(address, scope)) {
      throw Error(`잘못된 폴리곤 요청: address=${address}&scope=${scope}`);
    }
    const paths = await mapService.queryPolygon(
      address,
      scope as 'big' | 'medium' | 'small',
    );
    res.setHeader('Cache-Control', `max-age=${POLYGON_MAX_AGE}`);
    res.status(200).json(makeApiResponse(paths, ''));
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res.status(500).json(makeApiResponse({}, '맵 정보를 받아오지 못했습니다.'));
  }
}) as RequestHandler);

router.get('/rates', (async (req: Request, res: Response) => {
  const address = req.query.address as string;
  const scope = req.query.scope as string;
  try {
    if (!isRangeValid(address, scope)) {
      throw Error(`잘못된 평점 요청: address=${address}&scope=${scope}`);
    }
    const rates = await mapService.queryRates(
      address,
      scope as 'big' | 'medium' | 'small',
    );
    res.status(200).json(makeApiResponse(rates, ''));
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res
      .status(500)
      .json(makeApiResponse({}, '평점 정보를 받아오지 못했습니다.'));
  }
}) as RequestHandler);

router.get('/search', (async (req: Request, res: Response) => {
  const { keyword, onlyDong } = req.query;
  try {
    if (typeof keyword === 'string' && keyword.length > 0) {
      const center = await mapService.queryCenter(keyword, !!onlyDong);
      res.status(200).json(makeApiResponse(center, ''));
    } else {
      res.status(200).json(makeApiResponse([], ''));
    }
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res
      .status(500)
      .json(makeApiResponse({}, '검색 정보를 받아오지 못했습니다.'));
  }
}) as RequestHandler);

export default router;
