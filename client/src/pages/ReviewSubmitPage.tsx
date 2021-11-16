import React from 'react';
import styled from 'styled-components';

import ReviewModal from '@components/ReviewModal';

const ReviewSubmitDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const ReviewSubmitPage: React.FC = () => {
  return (
    <ReviewSubmitDiv>
      <ReviewModal />
    </ReviewSubmitDiv>
  );
};

export default ReviewSubmitPage;
