import AddressModal from '@components/AddressModal/index';
import { updateAddress } from '@controllers/profileController';
import { authState } from '@stores/atoms';
import { useRecoilState } from 'recoil';
import useHistoryRouter from '@hooks/useHistoryRouter';

import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const AddressWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ProfileAddressPage: React.FC = () => {
  const routeHistory = useHistoryRouter();
  const location = useLocation();

  const [auth, setAuth] = useRecoilState(authState);

  return (
    <AddressWrapper>
      <AddressModal
        title="우리 동네를 입력해주세요!"
        onSubmitHandler={updateAddress(auth, setAuth)}
        onCancelHandler={() => routeHistory(location.pathname, {})}
      />
    </AddressWrapper>
  );
};

export default ProfileAddressPage;
