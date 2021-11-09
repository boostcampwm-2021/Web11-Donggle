import Header from '@components/Header';
import Modal from '@components/modal/index';
import Map from '@components/Map/index';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { tempState } from '@stores/atoms';
import { TempCounter } from '@components/index';
import Sidebar from '@components/Sidebar';

const MainDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

const FlexContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex: 2 1 0;
`;

/*
  2021-11-02
  홍승용
  임시 예제 코드입니다. router내부에서 history객체를 활용하려면 props의 type으로 RouteComponentsProps를 사용해야 합니다.
*/
const MainPage: React.FC = () => {
  const [temp, setTemp] = useRecoilState(tempState);
  const [sidebar, setSidebar] = useState<boolean | null>(null);

  const toggleSidebar = (e) => {
    console.log(e.target, sidebar);
    if (sidebar === null || !sidebar) {
      console.log('열어');
      setSidebar(!sidebar);
    } else {
      setSidebar(false);
    }
  };

  return (
    <MainDiv>
      <Header></Header>
      <FlexContainer>
        <Map sidebar={sidebar} toggleSidebar={toggleSidebar}></Map>
        <Sidebar
          sidebar={sidebar}
          starRate={3}
          categoryRate={{
            safety: 3.6,
            traffic: 4.1,
            food: 2.7,
            entertainment: 1.5,
          }}
        ></Sidebar>
      </FlexContainer>
    </MainDiv>
  );
};

export default MainPage;
