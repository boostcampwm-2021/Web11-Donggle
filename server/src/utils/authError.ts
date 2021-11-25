import express, { Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import logger from '@loaders/loggerLoader';
import { makeApiResponse } from '@utils/index';
import { AuthError } from '@utils/authErrorEnum';

const authErrCheck = (user: string | -3 | -2 | JwtPayload, res: Response) => {
  if (user === AuthError.TOKEN_INVALID) {
    logger.error('유효하지 않은 토큰입니다.');
    return res
      .status(500)
      .json(makeApiResponse({}, '유효하지 않은 토큰입니다.'));
  }

  if ((user as JwtPayload).oauth_email === undefined) {
    logger.error('잘못된 토큰입니다.');
    return res.status(500).json(makeApiResponse({}, '잘못된 토큰입니다.'));
  }
};

export { authErrCheck };
