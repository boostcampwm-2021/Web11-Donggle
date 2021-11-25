import AddressModal from '@components/AddressModal/index';
import { updateAddress } from '@controllers/profileController';
import { authState } from '@stores/atoms';
import { useRecoilState } from 'recoil';
import useHistoryRouter from '@hooks/useHistoryRouter';

import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { getPrevPath } from '@utils/common';

const AddressWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ProfileAddressPage: React.FC = () => {
  const routeHistory = useHistoryRouter();
  const { pathname } = useLocation();
  const [auth, setAuth] = useRecoilState(authState);

  const onSubmitHandler = useMemo(
    () => updateAddress(auth, setAuth),
    [auth, setAuth],
  );

  const onCancelHandler = useCallback(
    () => routeHistory(getPrevPath(pathname)),
    [pathname, routeHistory],
  );

  return (
    <AddressWrapper>
      <AddressModal
        title="우리 동네를 입력해주세요!"
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
      />
    </AddressWrapper>
  );
};

export default ProfileAddressPage;
