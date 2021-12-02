import { logger } from './index';

import configs from '@configs/index';
import mongoose from 'mongoose';

const dbLoader = async () => {
  try {
    const connection = await mongoose.connect(configs.mongo_host);
    logger.info('MongoDB Conneted!');
  } catch (e) {
    logger.error('MongoDB Connection Failed, Message is : ', e);
  }
};

export default dbLoader;
