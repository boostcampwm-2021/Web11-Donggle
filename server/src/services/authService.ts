import { User, UserModel } from '@models/User';
import { MapInfo, MapInfoModel } from '@models/MapInfo';
import { ObjectId } from 'mongoose';

const isMember = async (oauth_email: string): Promise<User | null> => {
  return await UserModel.findOne().where('oauth_email').equals(oauth_email);
};

const findRegionInfo = async (address: string): Promise<MapInfo | null> => {
  console.log('찾기', address);
  return await MapInfoModel.findOne().where('address').equals(address);
};

const saveUserInfo = async (userInfo: User): Promise<string> => {
  const newUser = new UserModel(userInfo);

  try {
    await newUser.save();
    return 'success';
  } catch (err) {
    return '';
  }
};

export { isMember as isMemberService, findRegionInfo, saveUserInfo };
