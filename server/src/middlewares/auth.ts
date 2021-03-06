import { Response, NextFunction } from 'express';
import logger from '@loaders/loggerLoader';
import jwt from '@services/jwtService';
import { AuthError } from '@utils/authErrorEnum';
import { AuthMiddleRequest } from '@myTypes/User';
import { JwtPayload } from 'jsonwebtoken';
import createCustomError from '@utils/error';

const checkToken = (
  req: AuthMiddleRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = (req.cookies as { token: string }).token;

  if (!token) {
    return next(
      createCustomError('Unauthorized', new Error('Token이 없습니다')),
    );
  }

  const user = jwt.verify(token);

  if (user == AuthError.TOKEN_EXPIRED) {
    logger.error('Access Token의 유효기간이 만료되었습니다.');
    return next(
      createCustomError(
        'Unauthorized',
        new Error('토큰이 만료되었습니다'),
        '다시 로그인해 주세요',
      ),
    );
  }

  if (
    user === AuthError.TOKEN_INVALID ||
    (user as JwtPayload).oauth_email === undefined
  ) {
    return next(
      createCustomError('Unauthorized', new Error('토큰이 유효하지 않습니다')),
    );
  }

  req.id = (user as JwtPayload).oauth_email as string;
  next();
};

export default checkToken;
