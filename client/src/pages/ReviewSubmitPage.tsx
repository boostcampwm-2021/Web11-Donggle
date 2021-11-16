import React from 'react';
import styled from 'styled-components';

import ReviewModal from '@components/ReviewModal';

const ReviewSubmitDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ReviewSubmitPage: React.FC = () => {
  return (
    <ReviewSubmitDiv>
      <ReviewModal />
    </ReviewSubmitDiv>
  );
};

export default ReviewSubmitPage;
