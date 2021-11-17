import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { authState } from '@stores/atoms';
import useHistoryRouter from '@hooks/useHistoryRouter';
import AdressModal from '@components/AddressModal/index';
import { signUpAdress, isSignUp } from '@controllers/signUpController';
import { IAuthInfo } from '@myTypes/User';
import { IMapInfo } from '@myTypes/Map';

const SignUpModal: React.FC = () => {
  const [auth, setAuth] = useRecoilState<IAuthInfo>(authState);
  const [history, routeHistory] = useHistoryRouter();

  const onSubmitHandler = async (mapInfo: IMapInfo): Promise<void> => {
    const [status, userInfo] = await signUpAdress(mapInfo, auth);
    isSignUp(status, userInfo, auth, setAuth, routeHistory);
  };

  const onCancelHandler = (): void => {
    window.location.href = process.env.REACT_APP_MAIN_URL as string;
  };

  useEffect(() => {
    if (auth.address) {
      routeHistory('/', {});
    }
  }, [auth, routeHistory]);

  return (
    <AdressModal
      title="회원가입을 위해서 우리 동네 정보를 입력해주세요!"
      onSubmitHandler={onSubmitHandler}
      onCancelHandler={onCancelHandler}
    ></AdressModal>
  );
};

export default SignUpModal;
