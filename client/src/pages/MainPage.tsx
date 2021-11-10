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
  flex: 1 1 0;
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
    if (sidebar === null || !sidebar) {
      setSidebar(!sidebar);
    } else {
      setSidebar(false);
    }
  };

  const closeSidebar = () => {
    if (sidebar) setSidebar(false);
  };

  return (
    <MainDiv>
      <Header></Header>
      <FlexContainer>
        <Map sidebar={sidebar} toggleSidebar={toggleSidebar}></Map>
        <Sidebar
          sidebar={sidebar}
          starRate={3.3}
          categoryRate={{
            safety: 3.6,
            traffic: 4.1,
            food: 2.7,
            entertainment: 2.5,
          }}
          closeSidebar={closeSidebar}
        ></Sidebar>
      </FlexContainer>
    </MainDiv>
  );
};

export default MainPage;
