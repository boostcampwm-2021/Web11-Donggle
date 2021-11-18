import qs from 'qs';
import { IAPIResult } from '@myTypes/Common';
import { IUserInfo } from '@myTypes/User';

const getToken = async (): Promise<
  [number, IAPIResult<IUserInfo | Record<string, never>>]
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
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      },
    );
    const userInfo: IAPIResult<IUserInfo | Record<string, never>> =
      await userInfoResponse.json();

    return [userInfoResponse.status, userInfo];
  } catch (error) {
    return [500, { result: {}, message: '오류가 발생했습니다.' }];
  }
};

const isMember = (
  status: number,
  userInfo: IAPIResult<IUserInfo | Record<string, never>>,
  routeHistory,
  auth,
  setAuth,
): void => {
  const location = { pathname: '/', search: '', hash: '', state: undefined };

  if (status != 200) {
    alert(userInfo.message);
    routeHistory('/signin', { background: location });
    return;
  }

  if (status == 200 && !userInfo.result.jwtToken) {
    setAuth({
      ...auth,
      oauth_email: userInfo.result.oauthEmail,
      image: userInfo.result.image,
    });
    routeHistory('/signup', {
      background: location,
      oauth_email: userInfo.result.oauthEmail,
      image: userInfo.result.image,
    });
    return;
  }
  if (status == 200 && userInfo.result.jwtToken) {
    /*
    2021-11-16
    문혜현
    sessionstorage에 jwt토큰 값을 저장 && recoil update && 메인페이지로 routing
    */
    sessionStorage.setItem('jwt', userInfo.result.jwtToken);
    setAuth({
      ...auth,
      isLoggedin: true,
      oauth_email: userInfo.result.oauthEmail,
      address: userInfo.result.address,
      image: userInfo.result.image,
    });
    routeHistory('/', {});
    return;
  }
};

export { getToken, isMember };
