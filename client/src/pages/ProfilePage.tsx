import Profile from '@components/Profile/index';
import { authState } from '@stores/atoms';
import { useRecoilState } from 'recoil';
import useHistoryRouter from '@hooks/useHistoryRouter';

import React, { useEffect } from 'react';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
  width: 900px;
  height: auto;
  margin: 20px 0;
`;

const ProfilePage: React.FC = () => {
  const [auth] = useRecoilState(authState);
  const [history, routeHistory] = useHistoryRouter();

  useEffect(() => {
    if (!auth.isLoggedin) {
      const rootLocation = { pathname: '/', state: {} };
      routeHistory('/signin', { background: rootLocation });
    }
  });

  return (
    <ProfileWrapper>
      <Profile />
    </ProfileWrapper>
  );
};

export default ProfilePage;
