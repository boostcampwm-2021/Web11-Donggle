import Modal from '@components/Modal/index';

import React from 'react';
import styled from 'styled-components';

const RankingDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

const RankingPage: React.FC = () => {
  return (
    <RankingDiv>
      <Modal>
        <span>Ranking Page 입니다.</span>
      </Modal>
    </RankingDiv>
  );
};

export default RankingPage;
