import AddressModal from '@modals/AddressModal/index';
import { updateAddress } from '@controllers/profileController';
import { authState } from '@stores/atoms';
import { useRecoilState } from 'recoil';
import useHistoryRouter from '@hooks/useHistoryRouter';

import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getPrevPath } from '@utils/common';

const ProfileAddressModal: React.FC = () => {
  const routeHistory = useHistoryRouter();
  const { pathname } = useLocation();
  const [auth, setAuth] = useRecoilState(authState);

  const onSubmitHandler = useCallback(() => {
    updateAddress(auth, setAuth);
    routeHistory(getPrevPath(pathname), {});
  }, [auth, setAuth, routeHistory, pathname]);

  const onCancelHandler = useCallback(
    () => routeHistory(getPrevPath(pathname)),
    [pathname, routeHistory],
  );

  return (
    <>
      <AddressModal
        title="우리 동네를 입력해주세요!"
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
      />
    </>
  );
};

export default ProfileAddressModal;
