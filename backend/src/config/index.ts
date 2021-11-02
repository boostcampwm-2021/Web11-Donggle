import dotenv from 'dotenv';
import path from 'path';

process.env.NODE_ENV ??= 'development';
dotenv.config({
  path: path.resolve(process.cwd(), '.env.' + process.env.NODE_ENV),
});

export default {
  port: parseInt(process.env.PORT || '3003', 10),
};
