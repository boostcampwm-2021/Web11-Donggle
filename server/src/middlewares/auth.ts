import express, { Response, NextFunction } from 'express';
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

  if (!token)
    return res.status(500).json(makeApiResponse({}, '토큰이 없습니다.'));

  const user = jwt.verify(token);
  if (user === TOKEN_EXPIRED)
    return res
      .status(500)
      .json(makeApiResponse({}, '유효기간 만료되었습니다.'));
  if (user === TOKEN_INVALID)
    return res
      .status(500)
      .json(makeApiResponse({}, '유효하지 않은 토큰입니다.'));

  if ((user as JwtPayload).oauth_email === undefined)
    return res.status(500).json(makeApiResponse({}, '잘못된 토큰입니다.'));

  req.id = (user as JwtPayload).oauth_email as string;
  next();
};

export default checkToken;
