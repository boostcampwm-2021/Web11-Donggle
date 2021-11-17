import { SetterOrUpdater } from 'recoil';

import { IAPIResult } from '@myTypes/Common';
import { IToken } from '@myTypes/User';
import { IMapInfo } from '@myTypes/Map';
import { IAuthInfo } from '@myTypes/User';

const signUpAdress = async (
  mapInfo: IMapInfo,
  auth: IAuthInfo,
): Promise<[number, IAPIResult<IToken | Record<string, never>>]> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/auth/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        oauthEmail: auth.oauth_email,
        address: mapInfo.address,
        code: mapInfo.code,
        center: mapInfo.center,
        image: auth.image,
      }),
    },
  );

  const userInfo: IAPIResult<IToken | Record<string, never>> =
    await response.json();

  return [response.status, userInfo];
};

const isSignUp = (
  status: number,
  userInfo: IAPIResult<IToken | Record<string, never>>,
  auth: IAuthInfo,
  setAuth: SetterOrUpdater<IAuthInfo>,
  routeHistory,
): void => {
  if (status != 200) {
    alert(userInfo.message);
    /*
    2021-11-16
    문혜현
    회원가입에 실패했을 시 다시 signin 페이지로 가야 하는데 아직 routeHistory 구현 못함
    */
    //routeHistory('/signin', {});
  } else {
    sessionStorage.setItem('jwt', userInfo.result.jwtToken);
    setAuth({
      ...auth,
      isLoggedin: true,
      address: userInfo.result.address,
    });
    //routeHistory('/', {});
  }
};

export { signUpAdress, isSignUp };
