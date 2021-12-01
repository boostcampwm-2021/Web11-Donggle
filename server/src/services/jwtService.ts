import jwt from 'jsonwebtoken';
import { jwtConfig } from '@configs/secretKey';
import { AuthError } from '@utils/authErrorEnum';

export default {
  sign: (user: { oauth_email: string }) => {
    const payload = {
      oauth_email: user.oauth_email,
    };
    const token: { token: string } = {
      token: jwt.sign(payload, jwtConfig.secretKey, jwtConfig.options),
    };
    return token;
  },
  verify: (token: string) => {
    try {
      const decoded = jwt.verify(token, jwtConfig.secretKey);
      return decoded;
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
  },
};
