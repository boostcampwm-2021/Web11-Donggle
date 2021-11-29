import { CookieOptions, Response } from 'express';

const makeApiResponse = <T>(result: T, message: string) => {
  return {
    result,
    message,
  };
};

const isRangeValid = (
  address: string | undefined,
  scope: string | undefined,
) => {
  if (address === undefined) return false;
  if (scope === undefined) return false;
  if (scope !== 'big' && scope !== 'medium' && scope !== 'small') return false;
  return true;
};

const getCookieOption = (
  maxAge: number,
  sameSite: 'lax' | 'none' | 'strict' = 'lax',
): CookieOptions => {
  return {
    httpOnly: true,
    secure: true,
    sameSite: sameSite,
    maxAge: maxAge,
  };
};

const removeCookie = (res: Response): Response => {
  res.cookie('token', '', getCookieOption(0, 'lax'));
  res.cookie('refreshToken', '', getCookieOption(0, 'lax'));
  return res;
};

export { makeApiResponse, isRangeValid, getCookieOption, removeCookie };
