import { User } from '@models/User';
import { authService } from '@services/index';
import jwt from '@services/jwtService';
import logger from '@loaders/loggerLoader';
import { makeApiResponse } from '@utils/index';
import express, { Request, Response, RequestHandler } from 'express';
import { AuthRequest, UserInfo } from '@myTypes/User';

const router: express.Router = express.Router();

router.post('/signin', (async (req: AuthRequest, res: Response) => {
  const { code } = req.body;
  if (!code) throw new Error('비정상적인 접근입니다');

  try {
    const accessToken = await authService.getAccessToken(code);
    const oauthInfo = await authService.getOauthEmail(accessToken);
    if (!oauthInfo.oauthEmail) {
      throw new Error(
        `oauthInfo 데이터가 비어있습니다. 전달된 code 값 : ${code}`,
      );
    }

    const oauthEmail = { oauth_email: `github_${oauthInfo.oauthEmail}` };

    const isMember = await authService.isMember(oauthEmail.oauth_email);
    let userInfo = {
      jwtToken: '',
      refreshToken: '',
      oauthEmail: '',
      address: '',
      image: '',
    };

    if (isMember) {
      const jwtToken = jwt.sign(oauthEmail);
      userInfo = {
        ...userInfo,
        jwtToken: jwtToken.token,
        refreshToken: jwtToken.refreshToken,
        oauthEmail: isMember.oauth_email,
        address: isMember.address,
        image: isMember.image as string,
      };
      res.status(200).json(makeApiResponse(userInfo, '로그인에 성공했습니다.'));
    } else {
      userInfo = {
        ...userInfo,
        oauthEmail: oauthEmail.oauth_email,
        image: oauthInfo.image,
      };
      res.status(200).json(makeApiResponse(userInfo, '회원이 아닙니다.'));
    }
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res.status(500).json(makeApiResponse({}, '로그인에 실패했습니다.'));
  }
}) as RequestHandler);

router.post('/signup', (async (req: Request, res: Response) => {
  try {
    const { oauthEmail, address, code, center, image }: UserInfo =
      req.body as UserInfo;

    const newUserInfo: User = {
      oauth_email: oauthEmail,
      address,
      code,
      center,
      image,
    };
    await authService.saveUserInfo(newUserInfo);
    const jwtToken = jwt.sign({ oauth_email: oauthEmail });

    res.status(200).json(
      makeApiResponse(
        {
          jwtToken: jwtToken.token,
          refreshToken: jwtToken.refreshToken,
          address: address,
        },
        '성공적으로 회원가입 되었습니다.',
      ),
    );
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res.status(500).json(makeApiResponse({}, err.message));
  }
}) as RequestHandler);

export default router;
