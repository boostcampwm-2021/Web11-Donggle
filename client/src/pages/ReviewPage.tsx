import React from 'react';
import styled from 'styled-components';

const ReviewDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ReviewPage: React.FC = () => {
  return (
    <ReviewDiv>
      <span>Review Page 입니다.</span>
    </ReviewDiv>
  );
};

export default ReviewPage;
