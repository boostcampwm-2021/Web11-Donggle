import { mapService } from '@services/index';
import { makeApiResponse } from '@utils/index';
import logger from '@loaders/loggerLoader';
import express, { Request, Response, RequestHandler } from 'express';

const router: express.Router = express.Router();

router.get('/polygon', (async (req: Request, res: Response) => {
  const { scale, big, medium, small } = req.query;
  try {
    if (scale && (big || medium || small)) {
      const polygon = await mapService.queryPolygon(
        Number(scale),
        big as string,
        medium as string,
        small as string,
      );
      res.status(200).json(makeApiResponse(polygon, ''));
    } else {
      res.status(200).json(makeApiResponse([], ''));
    }
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res.status(500).json(makeApiResponse({}, '맵 정보를 받아오지 못했습니다.'));
  }
}) as RequestHandler);

router.get('/rates', (async (req: Request, res: Response) => {
  try {
    const { scale, big, medium, small } = req.query;
    if (scale && (big || medium || small)) {
      const rates = await mapService.queryRates(
        Number(scale),
        big as string,
        medium as string,
        small as string,
      );
      res.json(makeApiResponse(rates, ''));
    } else {
      res.json(
        makeApiResponse(
          [
            {
              address: '',
              code: '',
              codeLength: 0,
              center: [],
              total: 0,
              count: 0,
              categories: {
                safety: 0,
                traffic: 0,
                food: 0,
                entertainment: 0,
              },
            },
          ],
          '',
        ),
      );
    }
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res
      .status(500)
      .json(makeApiResponse({}, '평점 정보를 받아오지 못했습니다.'));
  }
}) as RequestHandler);

router.get('/search', (async (req: Request, res: Response) => {
  const { keyword } = req.query;
  try {
    if (typeof keyword === 'string' && keyword.length > 0) {
      const center = await mapService.queryCenter(keyword);
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
