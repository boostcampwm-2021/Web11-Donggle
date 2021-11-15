import { Request } from 'express';

export interface UserInfo {
  oauthEmail: string;
  address: string;
  image: string;
}
export interface AuthRequest extends Request {
  body: {
    code?: string;
  };
}
