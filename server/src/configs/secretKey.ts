import configs from '@configs/index';
import jwt from 'jsonwebtoken';

interface Config {
  secretKey: jwt.Secret;
  options: jwt.SignOptions;
}

const jwtConfig: Config = {
  secretKey: configs.jwt_secret,
  options: {
    algorithm: configs.jwt_algorithm as jwt.Algorithm,
    expiresIn: configs.jwt_expire,
  },
};

export { jwtConfig };
