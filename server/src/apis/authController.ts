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
import createError from '@utils/error';
import config from 'configs/index';
import { AuthRequest, UserInfo } from '@myTypes/User';
import { AuthMiddleRequest, Token } from '@myTypes/User';
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
        createError(
          'BadRequest',
          new Error('authroization code가 없습니다').stack,
        ),
      );
    }

    const accessToken = await authService.getAccessToken(code);
    const oauthInfo = await authService.getOauthEmail(accessToken);
    if (!oauthInfo.oauthEmail) {
      return next(
        createError('BadRequest', new Error('잘못된 JWT입니다').stack),
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

      res.cookie(
        'refreshToken',
        jwtToken.refreshToken,
        getCookieOption(Number(config.jwt_refresh_cookie_expire)),
      );

      res.status(201).json(makeApiResponse(userInfo, '로그인에 성공했습니다.'));
    } else {
      userInfo = {
        ...userInfo,
        oauthEmail: oauthEmail.oauth_email,
        image: oauthInfo.image,
      };

      res.json(makeApiResponse(userInfo, '회원이 아닙니다.'));
    }
  } catch (error) {
    const err = error as Error;
    return next(
      createError('InternalServerError', err.stack, '다시 로그인해 주세요.'),
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
    res.cookie(
      'refreshToken',
      jwtToken.refreshToken,
      getCookieOption(Number(config.jwt_refresh_cookie_expire)),
    );
    res.status(200).json(
      makeApiResponse(
        {
          address: address,
        },
        '성공적으로 회원가입 되었습니다.',
      ),
    );
  } catch (error) {
    const err = error as Error;
    return next(
      createError('InternalServerError', err.stack, '다시 회원가입 해주세요.'),
    );
  }
}) as RequestHandler);

router.get(
  '/refresh',
  checkToken,
  (req: AuthMiddleRequest, res: Response, next: NextFunction) => {
    try {
      const refreshToken = (req.cookies as Token).refreshToken;

      if (!refreshToken) {
        return next(
          createError(
            'Unauthorized',
            new Error('리프레시토큰이 없습니다').stack,
          ),
        );
      }

      const refreshVerify = jwt.verify(refreshToken, 'refreshToken');
      /*
    2021-11-20
    문혜현
    token과 refresh token 모두 만료되었을 때
    */
      if (refreshVerify == AuthError.TOKEN_EXPIRED) {
        return next(
          createError(
            'Unauthorized',
            new Error('리프레시토큰이 만료되었습니다').stack,
          ),
        );
      }

      if (
        refreshVerify === AuthError.TOKEN_INVALID ||
        (refreshVerify as JwtPayload).oauth_email === undefined
      ) {
        return next(
          createError(
            'Unauthorized',
            new Error('리프레시토큰이 유효하지 않습니다').stack,
          ),
        );
      }

      const newAccessToken = jwt.sign({
        oauth_email: (refreshVerify as JwtPayload).oauth_email as string,
      });

      res.cookie(
        'token',
        newAccessToken.token,
        getCookieOption(Number(config.jwt_cookie_expire)),
      );

      return res
        .status(200)
        .json(makeApiResponse({}, '새로운 토큰을 발급했습니다'));
    } catch (error) {
      const err = error as Error;
      return next(
        createError('InternalServerError', err.stack, '다시 로그인해 주세요'),
      );
    }
  },
);

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
            '회원 정보입니다',
          ),
        );
      } else {
        return next(
          createError(
            'Unauthorized',
            new Error('회원가입 되어있지 않습니다').stack,
          ),
        );
      }
    } catch (error) {
      const err = error as Error;
      return next(
        createError('InternalServerError', err.stack, '다시 로그인 해주세요'),
      );
    }
  },
);

router.get('/logout', (req: Request, res: Response) => {
  removeCookie(res).status(200).json({});
});

router.get('/unload', (req: Request, res: Response) => {
  removeCookie(res).status(200).json({});
});

export default router;
