import Header from '@components/Header';
import Map from '@components/Map/index';

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
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

type SidebarContentType = {
  address: string;
  starRate: number;
  categoryRate: {
    safety: number;
    traffic: number;
    food: number;
    entertainment: number;
  };
};

const DEFAULT_SIDEBAR_CONTENT = {
  address: '',
  starRate: 0,
  categoryRate: {
    safety: 0,
    traffic: 0,
    food: 0,
    entertainment: 0,
  },
};

/*
  2021-11-02
  홍승용
  임시 예제 코드입니다. router내부에서 history객체를 활용하려면 props의 type으로 RouteComponentsProps를 사용해야 합니다.
*/
const MainPage: React.FC = () => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [{ address, starRate, categoryRate }, setSidebarContent] = useState(
    DEFAULT_SIDEBAR_CONTENT,
  );

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  const openSidebar = useCallback(() => {
    setSidebar(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebar(false);
  }, []);

  const updateSidebarContent = useCallback((content: SidebarContentType) => {
    setSidebarContent(content);
  }, []);

  return (
    <MainDiv>
      <Header></Header>
      <FlexContainer>
        <Map
          openSidebar={openSidebar}
          closeSidebar={closeSidebar}
          updateSidebarContent={updateSidebarContent}
          toggleSidebar={toggleSidebar}
        ></Map>
        <Sidebar
          address={address}
          sidebar={sidebar}
          starRate={starRate}
          categoryRate={{
            safety: categoryRate.safety,
            traffic: categoryRate.traffic,
            food: categoryRate.food,
            entertainment: categoryRate.entertainment,
          }}
          closeSidebar={closeSidebar}
        ></Sidebar>
      </FlexContainer>
    </MainDiv>
  );
};

export default MainPage;
