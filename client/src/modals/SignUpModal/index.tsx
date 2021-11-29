import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { authState } from '@stores/atoms';
import useHistoryRouter from '@hooks/useHistoryRouter';
import AddressModal from '@modals/AddressModal/index';
import { signUpAdress, isSignUp } from '@controllers/signUpController';
import { IAuthInfo } from '@myTypes/User';
import { IMapInfo } from '@myTypes/Map';

const SignUpModal: React.FC = () => {
  const [auth, setAuth] = useRecoilState<IAuthInfo>(authState);
  const routeHistory = useHistoryRouter();
  const location = useLocation();

  const onCancelHandler = useCallback((): void => {
    routeHistory('/', {});
  }, []);

  const onSubmitHandler = useCallback(
    async (mapInfo: IMapInfo): Promise<void> => {
      const [status, userInfo] = await signUpAdress(mapInfo, auth, location);
      isSignUp(status, userInfo, auth, setAuth, routeHistory);
    },
    [],
  );

  return (
    <AddressModal
      title="회원가입을 위해서 우리 동네 정보를 입력해주세요!"
      onSubmitHandler={onSubmitHandler}
      onCancelHandler={onCancelHandler}
    ></AddressModal>
  );
};

export default SignUpModal;
