import ReviewModal from '@components/ReviewModal';
import React from 'react';
import styled from 'styled-components';

const ReviewDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ReviewPage: React.FC = () => {
  return (
    <ReviewDiv>
      <ReviewModal>Review Page 입니다.</ReviewModal>
    </ReviewDiv>
  );
};

export default ReviewPage;
