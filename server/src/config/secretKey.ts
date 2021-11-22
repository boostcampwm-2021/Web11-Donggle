import config from '@config/index';
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

const jwtRefreshConfig: Config = {
  secretKey: config.jwt_refresh_secret,
  options: {
    algorithm: config.jwt_refresh_algorithm as jwt.Algorithm,
    expiresIn: config.jwt_refresh_expire,
  },
};

const jwtIdConfig: Config = {
  secretKey: config.jwt_id_secret,
  options: {
    algorithm: config.jwt_id_algorithm as jwt.Algorithm,
    expiresIn: config.jwt_id_expire,
  },
};

export { jwtConfig, jwtRefreshConfig, jwtIdConfig };
