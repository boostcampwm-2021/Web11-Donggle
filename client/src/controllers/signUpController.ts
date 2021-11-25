import { SetterOrUpdater } from 'recoil';

import { IAPIResult } from '@myTypes/Common';
import { ISignUp } from '@myTypes/User';
import { IMapInfo } from '@myTypes/Map';
import { IAuthInfo } from '@myTypes/User';

const signUpAdress = async (
  mapInfo: IMapInfo,
  auth: IAuthInfo,
  location,
): Promise<[number, IAPIResult<ISignUp | Record<string, never>>]> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/auth/signup`,
    {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        oauthEmail: location.state.oauthEmail,
        address: mapInfo.address,
        code: mapInfo.code,
        center: mapInfo.center,
        image: location.state.image,
      }),
    },
  );

  const userInfo: IAPIResult<ISignUp | Record<string, never>> =
    await response.json();

  return [response.status, userInfo];
};

const isSignUp = (
  status: number,
  userInfo: IAPIResult<ISignUp | Record<string, never>>,
  auth: IAuthInfo,
  setAuth: SetterOrUpdater<IAuthInfo>,
  routeHistory,
): void => {
  if (status != 200) {
    alert(userInfo.message);
    routeHistory('/map/signin');
  } else {
    const now = new Date();
    const time = now.getTime();
    sessionStorage.setItem('timer', time.toString());
    setAuth({
      ...auth,
      isLoggedin: true,
      address: userInfo.result.address,
    });
    routeHistory('/map');
  }
};

export { signUpAdress, isSignUp };
