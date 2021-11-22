import express, { Request, Response, RequestHandler } from 'express';
import { ObjectId } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

import { User } from '@models/User';
import { authService } from '@services/index';
import jwt from '@services/jwtService';

import logger from '@loaders/loggerLoader';
import checkToken from '@middlewares/auth';
import { makeApiResponse } from '@utils/index';
import { AuthError } from '@utils/authErrorEnum';
import { authErrCheck } from '@utils/authError';
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
      const refreshToken = jwt.sign(oauthEmail, 'refresh');

      const userId = (isMember._id as ObjectId).toString();
      const userIdToken = jwt.sign({ id: userId }, 'id');
      void authService.updateRefreshToken(oauthEmail, refreshToken.token);

      userInfo = {
        ...userInfo,
        jwtToken: jwtToken.token,
        refreshToken: userIdToken.token,
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

    const jwtToken = jwt.sign({ oauth_email: oauthEmail });
    const refreshToken = jwt.sign({ oauth_email: oauthEmail }, 'refresh');

    const newUserInfo: User = {
      oauth_email: oauthEmail,
      address,
      code,
      center,
      image,
      refreshToken: refreshToken.token,
    };
    const newUserDoc = await authService.saveUserInfo(newUserInfo);
    const userId = (newUserDoc._id as ObjectId).toString();
    const userIdToken = jwt.sign({ id: userId }, 'id');

    res.status(200).json(
      makeApiResponse(
        {
          jwtToken: jwtToken.token,
          refreshToken: userIdToken.token,
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

router.get('/refresh', checkToken, async (req: Request, res: Response) => {
  const idToken = req.headers.refreshtoken as string;

  if (!idToken) {
    return res.status(500).json(makeApiResponse({}, '토큰이 없습니다.'));
  }

  const idVerify = jwt.verify(idToken, 'id');
  /*
  2021-11-20
  문혜현
  token과 refresh token 모두 만료되었을 때
  */
  if (idVerify == AuthError.TOKEN_EXPIRED) {
    return res.status(500).json(
      makeApiResponse(
        {
          jwtToken: AuthError.TOKEN_EXPIRED,
          refreshToken: AuthError.TOKEN_EXPIRED,
        },
        '다시 로그인해 주세요.',
      ),
    );
  }

  if (
    idVerify === AuthError.TOKEN_INVALID ||
    (idVerify as JwtPayload).id === undefined
  ) {
    return authErrCheck(idVerify, res);
  }

  const refreshTokenDb = await authService.findRefreshToken(
    (idVerify as JwtPayload).id as string,
  );

  const refreshToken = refreshTokenDb?.refreshToken;
  const refreshVerify = jwt.verify(refreshToken as string, 'refresh');

  if (refreshVerify == AuthError.TOKEN_EXPIRED) {
    return res.status(500).json(
      makeApiResponse(
        {
          jwtToken: AuthError.TOKEN_EXPIRED,
          refreshToken: AuthError.TOKEN_EXPIRED,
        },
        '다시 로그인해 주세요.',
      ),
    );
  }

  const newAccessToken = jwt.sign({
    oauth_email: (refreshVerify as JwtPayload).oauth_email as string,
  });

  return res
    .status(200)
    .json(
      makeApiResponse(
        { jwtToken: newAccessToken, refreshToken },
        '새로운 토큰을 발급했습니다',
      ),
    );
});

export default router;
