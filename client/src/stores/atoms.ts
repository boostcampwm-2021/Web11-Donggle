import { atom } from 'recoil';

const authState = atom({
  key: 'authentication',
  default: false,
});

export { authState };
