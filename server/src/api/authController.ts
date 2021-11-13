import express, { Request, Response, RequestHandler } from 'express';
import { User } from '@models/User';
import axios, { AxiosResponse } from 'axios';
import {
  isMemberService,
  findRegionInfo,
  saveUserInfo,
} from '@services/authService';
import jwt from '@services/jwtService';

const router: express.Router = express.Router();

interface Code {
  code: string;
}

interface UserInfo {
  oauthEmail: string;
  address: string;
  image: string;
}

router.post('/auth', (async (req: Request, res: Response) => {
  // access_token 발급
  const { code }: Code = req.body as Code;
  const clientId = process.env.CLIENT_ID as string;
  const clientSecret = process.env.CLIENT_SECRET as string;
  const TOKEN_URL = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;

  const tokenResponse: AxiosResponse = await axios.post(TOKEN_URL, {
    headers: {
      accept: 'application/json', // json으로 반환을 요청합니다.
    },
  });
  const searchParams = new URLSearchParams(tokenResponse.data as string);
  const accessToken = searchParams.get('access_token');

  // github에서 사용자 정보 가져오기
  const USER_PROFILE_URL = 'https://api.github.com/user';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = await axios.get(USER_PROFILE_URL, {
    headers: {
      Authorization: `token ${accessToken as string}`,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const oauthEmail = { oauth_email: 'github_' + (data.login as string) };

  // db 사용자 여부를 통해 jwt 토큰 생성
  const isMember = await isMemberService(oauthEmail.oauth_email);
  if (isMember) {
    const jwtToken = jwt.sign(oauthEmail);

    const userInfo = {
      jwtToken: jwtToken.token,
      oauthEmail: isMember.oauth_email,
      address: isMember.address,
      image: isMember.image,
    };
    res.status(200).send(userInfo);
  } else {
    const userInfo = {
      oauthEmail: oauthEmail.oauth_email,
      address: '',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      image: data.avatar_url as string,
      jwtToken: '',
    };
    res.status(200).send(userInfo);
  }

  // refactoring 필요: login, avatar_url만 반환해야 하는데 typescript 어렵다..
}) as RequestHandler);

router.post('/address', (async (req: Request, res: Response) => {
  const { oauthEmail, address, image }: UserInfo = req.body as UserInfo;
  const userRegionInfo = await findRegionInfo(address);
  console.log('찾기끝남', userRegionInfo);

  if (userRegionInfo) {
    const newUserInfo: User = {
      oauth_email: oauthEmail,
      address,
      code: userRegionInfo.code,
      center: userRegionInfo.center,
      image,
    };
    const isSave = await saveUserInfo(newUserInfo);
    if (isSave) {
      res.status(200).send({ msg: 'success' });
    } else {
      res.status(404).send({ err: '이미 회원가입하셨습니다' });
    }
  } else {
    res.status(404).send({ err: 'db에 없는 주소입니다' });
  }
}) as RequestHandler);

export default router;
