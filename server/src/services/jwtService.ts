import jwt from 'jsonwebtoken';
import { jwtConfig, jwtRefreshConfig, jwtIdConfig } from '@config/secretKey';
import { AuthError } from '@utils/authErrorEnum';

export default {
  sign: (user: { [id: string]: string }, kind = 'jwt') => {
    switch (kind) {
      case 'refresh': {
        const payload = {
          oauth_email: user.oauth_email,
        };
        const token: { token: string } = {
          token: jwt.sign(
            payload,
            jwtRefreshConfig.secretKey,
            jwtRefreshConfig.options,
          ),
        };
        return token;
      }

      case 'id': {
        const payload = {
          id: user.id,
        };
        const token: { token: string } = {
          token: jwt.sign(payload, jwtIdConfig.secretKey, jwtIdConfig.options),
        };
        return token;
      }

      default: {
        const payload = {
          oauth_email: user.oauth_email,
        };
        const token: { token: string } = {
          token: jwt.sign(payload, jwtConfig.secretKey, jwtConfig.options),
        };
        return token;
      }
    }
  },
  verify: (token: string, kind = 'jwt') => {
    let decoded: string | jwt.JwtPayload;
    try {
      switch (kind) {
        case 'refresh':
          decoded = jwt.verify(token, jwtRefreshConfig.secretKey);
          break;
        case 'id':
          decoded = jwt.verify(token, jwtIdConfig.secretKey);
          break;
        default:
          decoded = jwt.verify(token, jwtConfig.secretKey);
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
