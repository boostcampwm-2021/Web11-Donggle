import { logger } from './index';

import config from '@config/index';
import mongoose from 'mongoose';

const dbLoader = async () => {
  try {
    await mongoose.connect(config.mongo_host);
    logger.info('MongoDB Conneted!');
  } catch (e) {
    logger.error('MongoDB Connection Failed, Message is : ', e);
  }
};

export default dbLoader;
