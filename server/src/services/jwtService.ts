import jwt from 'jsonwebtoken';
import { jwtConfig, jwtRefreshConfig } from '@config/secretKey';

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export default {
  sign: (user: { oauth_email: string }) => {
    const payload = {
      oauth_email: user.oauth_email,
    };
    const token: { token: string; refreshToken: string } = {
      token: jwt.sign(payload, jwtConfig.secretKey, jwtConfig.options),
      refreshToken: jwt.sign(
        payload,
        jwtRefreshConfig.secretKey,
        jwtRefreshConfig.options,
      ),
    };
    return token;
  },
  verify: (token: string, kind = 'jwt') => {
    let decoded: string | jwt.JwtPayload;
    try {
      if (kind === 'jwt') {
        decoded = jwt.verify(token, jwtConfig.secretKey);
      } else {
        decoded = jwt.verify(token, jwtRefreshConfig.secretKey);
      }
    } catch (err) {
      const errMsg = (err as Error).message;
      if (errMsg === 'jwt expired') {
        return TOKEN_EXPIRED;
      } else if (errMsg === 'invalid token') {
        return TOKEN_INVALID;
      } else {
        return TOKEN_INVALID;
      }
    }
    return decoded;
  },
};
