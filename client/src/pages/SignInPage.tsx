import React from 'react';
import styled from 'styled-components';

import SignInPlate from '@components/SignInModal';

const SignInDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

const SignInPage: React.FC = () => {
  return (
    <SignInDiv>
      <SignInPlate />
    </SignInDiv>
  );
};

export default SignInPage;
