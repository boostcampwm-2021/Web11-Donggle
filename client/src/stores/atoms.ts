import { atom } from 'recoil';

const authState = atom({
  key: 'authentication',
  default: {
    isLoggedin: false,
    oauthEmail: '',
    address: '',
    image: '',
  },
});

export { authState };
