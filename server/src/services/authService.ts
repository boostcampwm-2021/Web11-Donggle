import { User, UserModel } from '@models/User';
import { ObjectId } from 'mongoose';

const isMember = async (oauth_email: string): Promise<User | null> => {
  return await UserModel.findOne().where('oauth_email').equals(oauth_email);
};

export default isMember;
