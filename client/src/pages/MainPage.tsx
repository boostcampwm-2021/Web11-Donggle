import MapComponent from '@components/Map/index';

import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Sidebar from '@components/Sidebar';

import { IMapInfo } from '@myTypes/Map';
import { IReviewContent } from '@myTypes/Review';

const MainPageDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
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
  const currentAddress = useRef<string>('');
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [sidebarAnimation, setSidebarAnimation] = useState<string>('close');
  const [sidebarRate, setSidebarRate] = useState<IMapInfo>(DEFAULT_RATE_DATA);
  const [sidebarContents, setSidebarContents] = useState<IReviewContent[]>([]);

  const openSidebar = useCallback(() => {
    setSidebarAnimation('open');
    setSidebar(true);
  }, []);

  const closeSidebar = useCallback(() => {
    currentAddress.current = '';
    setSidebarAnimation('close');
    setTimeout(() => setSidebar(false), 100);
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
    <MainPageDiv>
      <FlexContainer>
        <MapComponent
          openSidebar={openSidebar}
          closeSidebar={closeSidebar}
          currentAddress={currentAddress}
          updateSidebarRate={updateSidebarRate}
          updateSidebarContents={updateSidebarContents}
        ></MapComponent>
        {sidebar && (
          <Sidebar
            sidebar={sidebar}
            sidebarAnimation={sidebarAnimation}
            rateData={sidebarRate}
            contentsData={sidebarContents}
            updateSidebarContents={updateSidebarContents}
            hashTagData={sidebarRate.hashtags}
            closeSidebar={closeSidebar}
          ></Sidebar>
        )}
      </FlexContainer>
    </MainPageDiv>
  );
};

export default React.memo(MainPage);
