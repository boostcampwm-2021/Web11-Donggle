import React from 'react';
import styled from 'styled-components';

import SignInPlate from '@components/SignInPlate/index';

const LoginDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

const SignInPage: React.FC = () => {
  return (
    <LoginDiv>
      <SignInPlate />
    </LoginDiv>
  );
};

export default SignInPage;
