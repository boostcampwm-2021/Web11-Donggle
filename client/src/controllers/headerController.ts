import { SetterOrUpdater } from 'recoil';
import { getOptions } from '@utils/common';
import { IAuthInfo } from '@myTypes/User';

const signOut = (setAuth: SetterOrUpdater<IAuthInfo>) => {
  fetch(
    `${process.env.REACT_APP_API_URL as string}/api/auth/signout`,
    getOptions('GET', undefined, 'same-origin'),
  );
  setAuth({
    isLoggedin: false,
    oauthEmail: '',
    address: '',
    image: '',
  });
};

export { signOut };
