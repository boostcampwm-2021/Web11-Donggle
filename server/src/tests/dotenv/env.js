import dotenv from 'dotenv';
import path from 'path';

process.env.NODE_ENV ??= 'development';
module.exports = async () => {
  dotenv.config({
    path: path.resolve(__dirname, '../../../.env.development'),
  });
}
