import { Response, NextFunction } from 'express';
import logger from '@loaders/loggerLoader';
import jwt from '@services/jwtService';
import { makeApiResponse } from '@utils/index';
import { AuthError } from '@utils/authErrorEnum';
import { AuthMiddleRequest, Token } from '@myTypes/User';
import { JwtPayload } from 'jsonwebtoken';
import { removeCookie } from '@utils/index';
import createCustomError from '@utils/error';

const checkToken = (
  req: AuthMiddleRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = (req.cookies as Token).token;

  if (!token) {
    return next(
      createCustomError('Unauthorized', new Error('Token이 없습니다')),
    );
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
    return next(
      createCustomError(
        'Unauthorized',
        new Error('리프레시토큰이 유효하지 않습니다'),
      ),
    );
  }

  req.id = (user as JwtPayload).oauth_email as string;
  next();
};

export default checkToken;
