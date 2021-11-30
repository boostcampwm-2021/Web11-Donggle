import { IUser } from '@myTypes/User';
import { IAPIResult, ILocationBase } from '@myTypes/Common';
import { newIssuedToken } from '@controllers/authController';
import { getOptions } from '@utils/common';
import { IAuthInfo } from '@myTypes/User';
import { SetterOrUpdater } from 'recoil';
import { UseRouteHistoryType } from '@hooks/useHistoryRouter';

const refreshTokenUser = async (
  auth: IAuthInfo,
  setAuth: SetterOrUpdater<IAuthInfo>,
  routeHistory: UseRouteHistoryType,
  location: ILocationBase,
): Promise<void> => {
  /*
    2021-11-24
    문혜현
    access token을 재발급
    */
  const continueMember = await newIssuedToken();

  if (!continueMember) {
    setAuth({
      isLoggedin: false,
      oauthEmail: '',
      address: '',
      image: '',
    });
    routeHistory('/map/signin');
  }

  if (auth.isLoggedin) {
    /*
    2021-11-24
    문혜현
    access token만 재발급하는 경우
    */
    routeHistory(location.state.pathname);
  } else {
    /*
    2021-11-24
    문혜현
    user 정보도 재발급하는 경우
    */
    const userInfoResponse = await fetch(
      `${process.env.REACT_APP_API_URL as string}/api/auth/info`,
      getOptions('GET', undefined, 'same-origin'),
    );
    const userInfo: IAPIResult<IUser | Record<string, never>> =
      await userInfoResponse.json();
    setAuth({
      isLoggedin: true,
      oauthEmail: userInfo.result.oauthEmail,
      address: userInfo.result.address,
      image: userInfo.result.image,
    });

    routeHistory(location.state.pathname);
  }
};

export { refreshTokenUser };
