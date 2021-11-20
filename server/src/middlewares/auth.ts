import express, { Response, NextFunction } from 'express';
import logger from '@loaders/loggerLoader';
import jwt from '@services/jwtService';
import { makeApiResponse } from '@utils/index';
import { AuthMiddleRequest } from '@myTypes/User';
import { JwtPayload } from 'jsonwebtoken';

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const checkToken = (
  req: AuthMiddleRequest,
  res: Response,
  next: NextFunction,
) => {
  const token: string = req.headers.token as string;

  if (!token) {
    logger.error('토큰이 없습니다.');
    return res.status(500).json(makeApiResponse({}, '토큰이 없습니다.'));
  }

  const user = jwt.verify(token);
  if (user === TOKEN_EXPIRED) {
    logger.error('유효기간이 만료되었습니다.');
    return res
      .status(500)
      .json(
        makeApiResponse({ token: TOKEN_EXPIRED }, '유효기간 만료되었습니다.'),
      );
  }
  if (user === TOKEN_INVALID) {
    logger.error('유효하지 않은 토큰입니다.');
    return res
      .status(500)
      .json(makeApiResponse({}, '유효하지 않은 토큰입니다.'));
  }

  if ((user as JwtPayload).oauth_email === undefined) {
    logger.error('잘못된 토큰입니다.');
    return res.status(500).json(makeApiResponse({}, '잘못된 토큰입니다.'));
  }

  req.id = (user as JwtPayload).oauth_email as string;
  next();
};

export default checkToken;
