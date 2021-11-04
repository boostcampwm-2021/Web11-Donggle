import mongoose from 'mongoose';
import { logger } from './index';

const dbLoader = async () => {
  try {
    const connection = await mongoose.connect(<string>process.env.MONGO_HOST);
    logger.info('MongoDB Conneted!');
    return connection;
  } catch (e) {
    logger.error('MongoDB Connection Failed, Message is : ', e);
  }
};

export default dbLoader;
