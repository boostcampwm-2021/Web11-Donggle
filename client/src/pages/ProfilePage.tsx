import Header from '@components/Header';

import React from 'react';
import styled from 'styled-components';

const ProfileDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ProfilePage: React.FC = () => {
  return (
    <ProfileDiv>
      <Header></Header>
      <span>Profile Page 입니다.</span>
    </ProfileDiv>
  );
};

export default ProfilePage;
