import jwt from 'jsonwebtoken';
import { jwtConfig, jwtRefreshConfig } from '@config/secretKey';
import { AuthError } from '@utils/authErrorEnum';

export default {
  sign: (user: { oauth_email: string }, kind = 'jwt') => {
    const payload = {
      oauth_email: user.oauth_email,
    };
    if (kind === 'jwt') {
      const token: { token: string } = {
        token: jwt.sign(payload, jwtConfig.secretKey, jwtConfig.options),
      };
      return token;
    } else {
      const token: { token: string } = {
        token: jwt.sign(
          payload,
          jwtRefreshConfig.secretKey,
          jwtRefreshConfig.options,
        ),
      };
      return token;
    }
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
        return AuthError.TOKEN_EXPIRED;
      } else if (errMsg === 'invalid token') {
        return AuthError.TOKEN_INVALID;
      } else {
        return AuthError.TOKEN_INVALID;
      }
    }
    return decoded;
  },
};
