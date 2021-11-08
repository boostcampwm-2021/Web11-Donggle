import { logger } from './index';

import mongoose from 'mongoose';

const dbLoader = async () => {
  try {
    await mongoose.connect(<string>process.env.MONGO_HOST);
    logger.info('MongoDB Conneted!');
  } catch (e) {
    logger.error('MongoDB Connection Failed, Message is : ', e);
  }
};

export default dbLoader;
