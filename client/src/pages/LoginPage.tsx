import React from 'react';
import styled from 'styled-components';

import LoginPlate from '@components/LoginPlate';

const LoginDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

const LoginPage: React.FC = () => {
  return (
    <LoginDiv>
      <LoginPlate />
    </LoginDiv>
  );
};

export default LoginPage;
