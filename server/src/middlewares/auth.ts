import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import jwt from '@services/jwtService';
import { JwtPayload } from 'jsonwebtoken';

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

const checkToken: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string = req.headers.token as string;
  // 토큰 없음
  if (!token) return res.json({ code: 404 });
  // decode
  const user = jwt.verify(token);
  // 유효기간 만료
  if (user === TOKEN_EXPIRED) return res.json({ code: 404 });
  // 유효하지 않는 토큰
  if (user === TOKEN_INVALID) return res.json({ code: 404 });

  if ((user as JwtPayload).oauth_email === undefined)
    return res.json({ code: 404 });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  req.id = (user as JwtPayload).oauth_email;
  next();
};

module.exports = checkToken;
