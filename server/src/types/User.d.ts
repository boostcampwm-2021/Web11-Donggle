import { Request } from 'express';

interface UserInfo {
  oauthEmail: string;
  address: string;
  code: string;
  center: [number, number];
  image: string;
}
interface AuthRequest extends Request {
  body: {
    code?: string;
  };
}

interface AuthMiddleRequest extends Request {
  id?: string;
}

export { UserInfo, AuthRequest, AuthMiddleRequest };
