import Profile from '@components/Profile/index';

import React from 'react';
import styled from 'styled-components';

const ProfilePageDiv = styled.div`
  width: 100%;
  height: calc(100% - ${(props) => props.theme.componentSize.header});
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileContainer = styled.div`
  width: 900px;
  height: 100%;
  margin: 20px auto;
`;

const ProfilePage: React.FC = () => (
  <ProfilePageDiv>
    <ProfileContainer>
      <Profile />
    </ProfileContainer>
  </ProfilePageDiv>
);

export default React.memo(ProfilePage);
