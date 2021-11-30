import config from 'configs/index';
import jwt from 'jsonwebtoken';

interface Config {
  secretKey: jwt.Secret;
  options: jwt.SignOptions;
}

const jwtConfig: Config = {
  secretKey: config.jwt_secret,
  options: {
    algorithm: config.jwt_algorithm as jwt.Algorithm,
    expiresIn: config.jwt_expire,
  },
};

export { jwtConfig };
