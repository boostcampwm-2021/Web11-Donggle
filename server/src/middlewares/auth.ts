import { Response, NextFunction } from 'express';
import logger from '@loaders/loggerLoader';
import jwt from '@services/jwtService';
import { makeApiResponse } from '@utils/index';
import { AuthMiddleRequest, Token } from '@myTypes/User';
import { JwtPayload } from 'jsonwebtoken';
import { AuthError } from '@utils/authErrorEnum';
import { authErrCheck } from '@utils/authError';

const checkToken = (
  req: AuthMiddleRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = (req.cookies as Token).token;

  if (!token) {
    logger.error('토큰이 없습니다.');
    res.clearCookie('refreshToken');
    return res.status(500).json(makeApiResponse({}, '토큰이 없습니다.'));
  }

  const user = jwt.verify(token);

  if (user == AuthError.TOKEN_EXPIRED) {
    logger.error('Access Token의 유효기간이 만료되었습니다.');
    return next();
  }

  if (
    user === AuthError.TOKEN_INVALID ||
    (user as JwtPayload).oauth_email === undefined
  ) {
    return authErrCheck(user, res);
  }

  req.id = (user as JwtPayload).oauth_email as string;
  next();
};

export default checkToken;
