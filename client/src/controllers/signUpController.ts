import { SetterOrUpdater } from 'recoil';

import { showSnackbar } from '@utils/common';
import { IAPIResult } from '@myTypes/Common';
import { ISignUp } from '@myTypes/User';
import { IMapInfo } from '@myTypes/Map';
import { IAuthInfo } from '@myTypes/User';
import { getOptions } from '@utils/common';

const signUpAdress = async (
  mapInfo: IMapInfo,
  auth: IAuthInfo,
  location,
): Promise<[number, IAPIResult<ISignUp | Record<string, never>>]> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/auth/signup`,
    getOptions(
      'POST',
      {
        oauthEmail: location.state.oauthEmail,
        address: mapInfo.address,
        code: mapInfo.code,
        center: mapInfo.center,
        image: location.state.image,
      },
      'same-origin',
    ),
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
  if (status != 201) {
    showSnackbar(userInfo.message, true);
    routeHistory('/map/signin');
  } else {
    setAuth({
      ...auth,
      isLoggedin: true,
      address: userInfo.result.address,
    });
    routeHistory('/map');
  }
};

export { signUpAdress, isSignUp };
