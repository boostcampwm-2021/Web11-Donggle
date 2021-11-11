import express, { Request, Response, RequestHandler } from 'express';
import axios, { AxiosResponse } from 'axios';
import { profile } from 'console';

const router: express.Router = express.Router();

interface Code {
  code: string;
}

interface UserInfo {
  login: string;
  avatar_url: string;
}

router.post('/auth', (async (req: Request, res: Response) => {
  const { code }: Code = req.body as Code;
  const clientId = process.env.CLIENT_ID as string;
  const clientSecret = process.env.CLIENT_SECRET as string;
  const TOKEN_URL = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
  console.log('tokenURL', TOKEN_URL);

  const tokenResponse: AxiosResponse = await axios.post(TOKEN_URL);
  const searchParams = new URLSearchParams(tokenResponse.data as string);
  const accessToken = searchParams.get('access_token');

  const USER_PROFILE_URL = 'https://api.github.com/user';
  const profileResponse: AxiosResponse = await axios.get(USER_PROFILE_URL, {
    headers: {
      Authorization: `token ${accessToken as string}`,
    },
  });
  const userInfo = profileResponse.data as object;

  // DB에 저장되어 있는지 여부를 통해 회원인지 비회원인지 구별
  // db에 저장되어 있으면 jwt 토큰 발급
  // refactoring 필요: login, avatar_url만 반환해야 하는데 typescript 어렵다..
  res.status(200).send(userInfo);
}) as RequestHandler);

export default router;
