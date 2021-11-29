import { mapService } from '@services/index';
import { makeApiResponse, isRangeValid } from '@utils/index';
import logger from '@loaders/loggerLoader';
import express, {
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from 'express';
import createError from '@utils/error';

const router: express.Router = express.Router();
const POLYGON_MAX_AGE = 60 * 60 * 1;

router.get('/polygon', (async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const address = req.query.address as string;
  const scope = req.query.scope as string;
  try {
    if (!isRangeValid(address, scope)) {
      return next(
        createError(
          'BadRequest',
          new Error(`잘못된 폴리곤 요청: address=${address}&scope=${scope}`)
            .stack,
        ),
      );
    }
    const paths = await mapService.queryPolygon(
      address,
      scope as 'big' | 'medium' | 'small',
    );
    res.setHeader('Cache-Control', `max-age=${POLYGON_MAX_AGE}`);
    res.status(200).json(makeApiResponse(paths, ''));
  } catch (error) {
    const err = error as Error;
    return next(createError('InternalServerError', err.stack));
  }
}) as RequestHandler);

router.get('/rates', (async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const address = req.query.address as string;
  const scope = req.query.scope as string;
  try {
    if (!isRangeValid(address, scope)) {
      return next(
        createError(
          'InternalServerError',
          `잘못된 평점 요청: address=${address}&scope=${scope}`,
        ),
      );
    }
    const rates = await mapService.queryRates(
      address,
      scope as 'big' | 'medium' | 'small',
    );
    res.status(200).json(makeApiResponse(rates, ''));
  } catch (error) {
    const err = error as Error;
    return next(createError('InternalServerError', err.stack));
  }
}) as RequestHandler);

router.get('/search', (async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    return next(createError('InternalServerError', err.stack));
  }
}) as RequestHandler);

export default router;
