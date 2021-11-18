import AddressModal from '@components/AddressModal/index';
import { updateAddress } from '@controllers/profileController';
import { authState } from '@stores/atoms';
import { useRecoilState } from 'recoil';
import useHistoryRouter from '@hooks/useHistoryRouter';

import React from 'react';
import styled from 'styled-components';

const AddressWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ProfileAddressPage: React.FC = () => {
  const [history, routeHistory] = useHistoryRouter();

  const [auth, setAuth] = useRecoilState(authState);

  return (
    <AddressWrapper>
      <AddressModal
        title="우리 동네를 입력해주세요!"
        onSubmitHandler={updateAddress(auth, setAuth)}
        onCancelHandler={() => history.goBack()}
      />
    </AddressWrapper>
  );
};

export default ProfileAddressPage;
