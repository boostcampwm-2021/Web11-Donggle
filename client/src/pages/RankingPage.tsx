import RankingModal from '@components/RankingModal';

import React from 'react';
import styled from 'styled-components';

const RankingDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

const RankingPage: React.FC = () => {
  return (
    <RankingDiv>
      <RankingModal />
    </RankingDiv>
  );
};

export default RankingPage;
