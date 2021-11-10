import { atom } from 'recoil';

/*
  2021-11-02
  홍승용
  recoil 사용 예시코드입니다. atom으로 state의 type을 지정합니다.
 */
const tempState = atom({
  key: 'tempState', // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
});

const authState = atom({
  key: 'authentication',
  default: false,
});

export { tempState, authState };
