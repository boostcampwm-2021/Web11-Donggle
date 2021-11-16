import React from 'react';
import styled from 'styled-components';

import SignUpModal from '@components/SignUpModal/index';

const SignUpDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

const SignUpPage: React.FC = () => {
  return (
    <SignUpDiv>
      <SignUpModal />
    </SignUpDiv>
  );
};

export default SignUpPage;
