import Profile from '@components/Profile/index';

import React from 'react';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const ProfileContainer = styled.div`
  width: 900px;
  height: 100%;
  margin: 20px auto;
`;

const ProfilePage: React.FC = () => (
  <ProfileWrapper>
    <ProfileContainer>
      <Profile />
    </ProfileContainer>
  </ProfileWrapper>
);

export default ProfilePage;
