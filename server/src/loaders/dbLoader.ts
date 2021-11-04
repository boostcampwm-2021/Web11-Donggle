import mongoose from 'mongoose';
import { logger } from './index';

async function dbLoader() {
  try {
    await mongoose.connect(<string>process.env.MONGO_HOST);
    logger.info('MongoDB Conneted!');
  } catch (e) {
    logger.error('MongoDB Connection Failed, Message is : ', e);
  }
}

export default dbLoader;
