import express, {
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { User } from '@models/User';
import { authService } from '@services/index';
import jwt from '@services/jwtService';

import checkToken from '@middlewares/auth';
import { makeApiResponse } from '@utils/index';
import { AuthError } from '@utils/authErrorEnum';
import { getCookieOption, removeCookie } from '@utils/index';
import createCustomError from '@utils/error';
import config from 'configs/index';
import { AuthRequest, UserInfo } from '@myTypes/User';
import { AuthMiddleRequest } from '@myTypes/User';
const router: express.Router = express.Router();

router.post('/signin', (async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { code } = req.body;

  try {
    if (!code) {
      return next(
        createCustomError(
          'BadRequest',
          new Error('authroization code가 없습니다'),
        ),
      );
    }

    const accessToken = await authService.getAccessToken(code);
    const oauthInfo = await authService.getOauthEmail(accessToken);
    if (!oauthInfo.oauthEmail) {
      return next(
        createCustomError('BadRequest', new Error('잘못된 접근입니다')),
      );
    }

    const oauthEmail = { oauth_email: `github_${oauthInfo.oauthEmail}` };

    const isMember = await authService.isMember(oauthEmail.oauth_email);
    let userInfo = {
      oauthEmail: '',
      address: '',
      image: '',
    };

    if (isMember) {
      const jwtToken = jwt.sign(oauthEmail);
      userInfo = {
        oauthEmail: isMember.oauth_email,
        address: isMember.address,
        image: isMember.image as string,
      };

      res.cookie(
        'token',
        jwtToken.token,
        getCookieOption(Number(config.jwt_cookie_expire)),
      );

      res.status(201).json(makeApiResponse(userInfo, '')); // 로그인 성공 
    } else {
      userInfo = {
        ...userInfo,
        oauthEmail: oauthEmail.oauth_email,
        image: oauthInfo.image,
      };

      res.status(201).json(makeApiResponse(userInfo, '')); // 회원가입 페이지로 Route
    }
  } catch (error) {
    const err = error as Error;
    return next(
      createCustomError('InternalServerError', err, '재로그인이 필요합니다.'),
    );
  }
}) as RequestHandler);

router.post('/signup', (async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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

    res.cookie(
      'token',
      jwtToken.token,
      getCookieOption(Number(config.jwt_cookie_expire)),
    );

    res.status(201).json(
      makeApiResponse(
        {
          address: address,
        },
        '',
      ),
    );
  } catch (error) {
    const err = error as Error;
    return next(
      createCustomError('InternalServerError', err, '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.'),
    );
  }
}) as RequestHandler);

router.get(
  '/info',
  checkToken,
  async (req: AuthMiddleRequest, res: Response, next: NextFunction) => {
    try {
      const userInfo = await authService.isMember(req.id as string);
      if (userInfo) {
        res.status(200).json(
          makeApiResponse(
            {
              oauthEmail: userInfo.oauth_email,
              address: userInfo.address,
              image: userInfo.image,
            },
            '',
          ),
        );
      } else {
        return next(
          createCustomError(
            'Unauthorized',
            new Error('회원가입 되어있지 않습니다'),
          ),
        );
      }
    } catch (error) {
      const err = error as Error;
      return next(
        createCustomError('InternalServerError', err, '재로그인이 필요합니다.'),
      );
    }
  },
);

router.get('/signout', (req: Request, res: Response) => {
  removeCookie(res).status(200).json({});
});

export default router;
