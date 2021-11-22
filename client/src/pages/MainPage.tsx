import MapComponent from '@components/Map/index';

import React, { useState, useCallback, Suspense } from 'react';
import styled from 'styled-components';
const SidebarLazy = React.lazy(() => import('@components/Sidebar'));

import { IMapInfo } from '@myTypes/Map';
import { IReviewContent } from '@myTypes/Review';

const MainDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

const FlexContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-width: 1000px;
  height: 100%;
  flex: 1 1 0;
`;

const DEFAULT_RATE_DATA: IMapInfo = {
  address: '',
  code: '',
  codeLength: 0,
  center: [37.541, 126.986], // 제주도
  count: 0,
  categories: {
    safety: 0,
    traffic: 0,
    food: 0,
    entertainment: 0,
  },
  hashtags: new Map(),
};

const MainPage: React.FC = () => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [sidebarRate, setSidebarRate] = useState<IMapInfo>(DEFAULT_RATE_DATA);
  const [sidebarContents, setSidebarContents] = useState<IReviewContent[]>([]);

  const openSidebar = useCallback(() => {
    setSidebar(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebar(false);
  }, []);

  const updateSidebarRate = useCallback((rateData: IMapInfo) => {
    setSidebarRate(rateData);
  }, []);

  const updateSidebarContents = useCallback(
    (contentsData: IReviewContent[]) => {
      setSidebarContents(contentsData);
    },
    [],
  );

  return (
    <MainDiv>
      <FlexContainer>
        <MapComponent
          openSidebar={openSidebar}
          closeSidebar={closeSidebar}
          updateSidebarRate={updateSidebarRate}
          updateSidebarContents={updateSidebarContents}
        ></MapComponent>
        {sidebar && (
          <Suspense fallback="loading...">
            <SidebarLazy
              sidebar={sidebar}
              rateData={sidebarRate}
              contentsData={sidebarContents}
              setContentsData={setSidebarContents}
              hashTagData={sidebarRate.hashtags}
              closeSidebar={closeSidebar}
            ></SidebarLazy>
          </Suspense>
        )}
      </FlexContainer>
    </MainDiv>
  );
};

export default MainPage;
