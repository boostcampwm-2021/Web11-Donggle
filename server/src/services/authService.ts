import { User, UserModel } from '@models/User';
import { MapInfo, MapInfoModel } from '@models/MapInfo';
import config from 'configs/index';
import axios, { AxiosResponse } from 'axios';

const getAccessToken = async (code: string): Promise<string> => {
  const TOKEN_URL = `https://github.com/login/oauth/access_token?client_id=${config.client_id}&client_secret=${config.client_secret}&code=${code}`;

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

const isMember = async (oauth_email: string) => {
  return await UserModel.findOne().where('oauth_email').equals(oauth_email);
};

const findRegionInfo = async (address: string) => {
  return await MapInfoModel.findOne().where('address').equals(address);
};

const saveUserInfo = async (userInfo: User) => {
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
