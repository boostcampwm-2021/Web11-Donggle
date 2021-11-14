import { atom } from 'recoil';

const authState = atom({
  key: 'authentication',
  default: {
    isLoggedin: true,
    oauth_email: 'github-isanghaessi',
    address: '인천광역시 부평구 부평4동',
    image: '',
  },
});

export { authState };
