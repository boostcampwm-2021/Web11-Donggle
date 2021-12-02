import { SetterOrUpdater } from 'recoil';

import { IAPIResult, ILocationBase } from '@myTypes/Common';
import { showSnackbar } from '@utils/common';
import { IUser } from '@myTypes/User';
import { IMapInfo } from '@myTypes/Map';
import { IAuthInfo } from '@myTypes/User';
import { getOptions } from '@utils/common';
import { UseRouteHistoryType } from '@hooks/useHistoryRouter';

const signUpAdress = async (
  mapInfo: IMapInfo,
  auth: IAuthInfo,
  location: ILocationBase,
): Promise<[number, IAPIResult<IUser | Record<string, never>>]> => {
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

  const userInfo: IAPIResult<IUser | Record<string, never>> =
    await response.json();

  return [response.status, userInfo];
};

const isSignUp = (
  status: number,
  userInfo: IAPIResult<IUser | Record<string, never>>,
  auth: IAuthInfo,
  setAuth: SetterOrUpdater<IAuthInfo>,
  routeHistory: UseRouteHistoryType,
): void => {
  if (status !== 201) {
    showSnackbar(userInfo.message, true);
    routeHistory('/map/signin');
  } else {
    setAuth({
      isLoggedin: true,
      oauthEmail: userInfo.result.oauthEmail,
      address: userInfo.result.address,
      image: userInfo.result.image,
    });
    routeHistory('/map');
  }
};

export { signUpAdress, isSignUp };
