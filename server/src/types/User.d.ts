import { Request } from 'express';

interface UserInfo {
  oauthEmail: string;
  address: string;
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
