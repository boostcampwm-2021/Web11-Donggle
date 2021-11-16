import Profile from '@components/Profile/index';

import React from 'react';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
  width: 900px;
  height: auto;
  margin: 20px 0;
`;

const ProfilePage: React.FC = () => (
  <ProfileWrapper>
    <Profile />
  </ProfileWrapper>
);

export default ProfilePage;
