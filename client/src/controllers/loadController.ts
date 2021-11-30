import { IAPIResult } from '@myTypes/Common';
import { IUser } from '@myTypes/User';
import { getOptions } from '@utils/common';

const checkUserSignIn = async (setAuth, routeHistory, location) => {
  const userInfoRes = await fetch(
    `${process.env.REACT_APP_API_URL as string}/api/auth/info`,
    getOptions('GET', undefined, 'same-origin'),
  );
  const userInfo: IAPIResult<IUser | Record<string, never>> =
    await userInfoRes.json();

  if (userInfoRes.status !== 200) {
    alert(userInfo.message);
    /*
    2021-11-20
    문혜현
    쿠키가 만료/token 만료 또는 로그인을 안 한 상태
    */
    routeHistory('/map/signin');
  } else {
    setAuth({
      isLoggedin: true,
      oauthEmail: userInfo.result.oauthEmail,
      address: userInfo.result.address,
      image: userInfo.result.image,
    });

    routeHistory(location.state.pathname);
  }
};

export { checkUserSignIn };
