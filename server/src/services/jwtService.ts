import jwt from 'jsonwebtoken';
import jwtConfig from '@config/secretKey';

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

interface User {
  oauth_email: string;
}

interface Token {
  token: string;
}

export default {
  sign: (user: User) => {
    /* 현재는 idx와 email을 payload로 넣었지만 필요한 값을 넣으면 됨! */
    const payload = {
      oauth_email: user.oauth_email,
    };
    const token: Token = {
      //sign메소드를 통해 access token 발급!
      token: jwt.sign(payload, jwtConfig.secretKey, jwtConfig.options),
    };
    return token;
  },
  verify: (token: string) => {
    let decoded: string | jwt.JwtPayload;
    try {
      // verify를 통해 값 decode!
      decoded = jwt.verify(token, jwtConfig.secretKey);
    } catch (err) {
      const errMsg = (err as Error).message;
      if (errMsg === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      } else if (errMsg === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log('invalid token');
        return TOKEN_INVALID;
      }
    }
    return decoded;
  },
};
