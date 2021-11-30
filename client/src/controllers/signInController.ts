import qs from 'qs';
import { IAPIResult } from '@myTypes/Common';
import { IAuthInfo, IUser } from '@myTypes/User';
import { getOptions } from '@utils/common';
import { SetterOrUpdater } from 'recoil';
import { UseRouteHistoryType } from '@hooks/useHistoryRouter';

const getToken = async (): Promise<
  [number, IAPIResult<IUser | Record<string, never>>]
> => {
  const { code } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  /*
    2021-11-16
    문혜현
    backend에서 access_token이랑 github api 날린 다음에 github_id를 보냄
    */
  try {
    const userInfoResponse = await fetch(
      `${process.env.REACT_APP_API_URL as string}/api/auth/signin`,
      getOptions('POST', { code }, 'same-origin'),
    );
    const userInfo: IAPIResult<IUser | Record<string, never>> =
      await userInfoResponse.json();

    return [userInfoResponse.status, userInfo];
  } catch (error) {
    return [500, { result: {}, message: '오류가 발생했습니다.' }];
  }
};

const isMember = (
  status: number,
  userInfo: IAPIResult<IUser | Record<string, never>>,
  routeHistory: UseRouteHistoryType,
  setAuth: SetterOrUpdater<IAuthInfo>,
): void => {
  if (status !== 201) {
    alert(userInfo.message);
    routeHistory('/map/signin');
    return;
  }

  if (!userInfo.result.address) {
    routeHistory('/map/signup', {
      oauthEmail: userInfo.result.oauthEmail,
      image: userInfo.result.image,
      isRoute: true,
    });
    return;
  }
  if (userInfo.result.address) {
    /*
    2021-11-16
    문혜현
    recoil update && 메인페이지로 routing
    */
    setAuth({
      isLoggedin: true,
      oauthEmail: userInfo.result.oauthEmail,
      address: userInfo.result.address,
      image: userInfo.result.image,
    });
    routeHistory('/map');
    return;
  }
};

export { getToken, isMember };
