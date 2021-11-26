import dotenv from 'dotenv';
import path from 'path';

process.env.NODE_ENV ??= 'development';
dotenv.config({
  path: path.resolve(process.cwd(), '.env.' + process.env.NODE_ENV),
});

export default {
  node_env: process.env.NODE_ENV || '',
  port: parseInt(process.env.PORT || '3003', 10),
  mongo_host: process.env.MONGO_HOST || '',
  kosis_consumer_key: process.env.KOSIS_CONSUMER_KEY || '',
  kosis_consumer_secret: process.env.KOSIS_CONSUMER_SECRET || '',
  admin_password: process.env.ADMIN_PASSWORD || '',
  react_url: process.env.REACT_URL || '',
  client_id: process.env.CLIENT_ID || '',
  client_secret: process.env.CLIENT_SECRET || '',
  jwt_secret: process.env.JWT_SECRET || '',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || '',
  jwt_algorithm: process.env.JWT_ALGORITHM || '',
  jwt_refresh_algorithm: process.env.JWT_REFRESH_ALGORITHM || '',
  jwt_expire: process.env.JWT_EXPIRE || '',
  jwt_refresh_expire: process.env.JWT_REFRESH_EXPIRE || '',
  jwt_cookie_expire: process.env.JWT_COOKIE_EXPIRE || '',
  jwt_refresh_cookie_expire: process.env.JWT_REFRESH_COOKIE_EXPIRE || '',
};
