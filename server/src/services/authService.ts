import { User, UserModel } from '@models/User';
import { MapInfo, MapInfoModel } from '@models/MapInfo';
import { ObjectId } from 'mongoose';
import axios, { AxiosResponse } from 'axios';

const getAccessToken = async (code: string): Promise<string> => {
  const clientId = process.env.CLIENT_ID as string;
  const clientSecret = process.env.CLIENT_SECRET as string;
  const TOKEN_URL = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;

  const tokenResponse: AxiosResponse = await axios.post(TOKEN_URL, {
    headers: {
      accept: 'application/json',
    },
  });
  const searchParams = new URLSearchParams(tokenResponse.data as string);
  const accessToken: string = searchParams.get('access_token') || '';

  return accessToken;
};

const getOauthEmail = async (
  accessToken: string,
): Promise<{ oauthEmail: string; image: string }> => {
  if (!accessToken) {
    return { oauthEmail: '', image: '' };
  }
  const USER_PROFILE_URL = 'https://api.github.com/user';
  const { data } = await axios.get<{ login: string; avatar_url: string }>(
    USER_PROFILE_URL,
    {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    },
  );

  return { oauthEmail: data.login, image: data.avatar_url };
};

const isMember = async (oauth_email: string): Promise<User | null> => {
  return await UserModel.findOne().where('oauth_email').equals(oauth_email);
};

const findRegionInfo = async (address: string): Promise<MapInfo | null> => {
  return await MapInfoModel.findOne().where('address').equals(address);
};

const saveUserInfo = async (userInfo: User): Promise<User> => {
  const newUser = new UserModel(userInfo);
  return await newUser.save().catch((err: Error) => {
    err.message = '이미 회원가입하셨습니다.';
    throw err;
  });
};

export default {
  getAccessToken,
  getOauthEmail,
  isMember,
  findRegionInfo,
  saveUserInfo,
};
