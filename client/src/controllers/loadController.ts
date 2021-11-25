import { IUser } from '@myTypes/User';
import { IAPIResult } from '@myTypes/Common';
import { newIssuedToken } from '@controllers/authController';

const refreshTokenUser = async (auth, setAuth, routeHistory, location) => {
  /*
    2021-11-24
    문혜현
    access token을 재발급
    */
  const continueMember = await newIssuedToken();

  if (!continueMember) {
    setAuth({
      ...auth,
      isLoggedin: false,
      oauth_email: '',
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
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('token', sessionStorage.getItem('jwt') as string);
    const userInfoResponse = await fetch(
      `${process.env.REACT_APP_API_URL as string}/api/auth/info`,
      {
        method: 'GET',
        headers: requestHeaders,
      },
    );
    const userInfo: IAPIResult<IUser | Record<string, never>> =
      await userInfoResponse.json();
    setAuth({
      ...auth,
      isLoggedin: true,
      oauth_email: userInfo.result.oauth_email,
      address: userInfo.result.address,
      image: userInfo.result.image,
    });

    routeHistory(location.state.pathname);
  }
};

export { refreshTokenUser };
