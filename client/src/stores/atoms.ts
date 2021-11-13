import { atom } from 'recoil';

const authState = atom({
  key: 'authentication',
  default: { isLoggedin: false, oauth_email: '', address: '', image: '' },
});

export { authState };
