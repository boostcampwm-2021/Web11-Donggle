import { rankService } from '@services/index';
import { makeApiResponse } from '@utils/index';
import logger from '@loaders/loggerLoader';

import express, { RequestHandler } from 'express';
const router = express.Router();

const isParamsValid = (
  address: string | undefined,
  scope: string | undefined,
) => {
  if (address === undefined) return false;
  if (scope === undefined) return false;
  if (scope !== 'big' && scope !== 'medium' && scope !== 'small') return false;
  return true;
};

router.get('/', (async (req, res) => {
  const address = req.query.address as string;
  const scope = req.query.scope as string;
  try {
    if (!isParamsValid(address, scope)) {
      throw Error(`잘못된 요청: address=${address}, scope=${scope}`);
    }
    const rates = await rankService.queryRates(
      address,
      scope as 'big' | 'medium' | 'small',
    );
    res.status(200).json(makeApiResponse(rates, ''));
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res
      .status(500)
      .json(makeApiResponse({}, '랭킹 정보를 받아오지 못했습니다.'));
  }
}) as RequestHandler);

export default router;
