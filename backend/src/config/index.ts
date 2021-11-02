import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default {
  port: parseInt(process.env.PORT || '3001', 10),
};
