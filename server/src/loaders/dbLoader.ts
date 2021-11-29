import { logger } from './index';

import config from 'configs/index';
import mongoose from 'mongoose';

const dbLoader = async () => {
  try {
    const connection = await mongoose.connect(config.mongo_host);
    logger.info('MongoDB Conneted!');
  } catch (e) {
    logger.error('MongoDB Connection Failed, Message is : ', e);
  }
};

export default dbLoader;
