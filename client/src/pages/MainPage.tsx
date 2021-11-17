import Map from '@components/Map/index';

import React, { useState, useCallback, Suspense } from 'react';
import styled from 'styled-components';
const SidebarLazy = React.lazy(() => import('@components/Sidebar'));
import { IMapInfo } from '@myTypes/Map';

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

// const TemporaryReviewData: IReviewContent[] = [
//   {
//     categories: {
//       safety: 4,
//       traffic: 4,
//       food: 5,
//       entertainment: 3,
//     },
//     text: 'ㄴㅇㅁㄹ머ㅗㅇ피ㅓ멀호매asdfasdfgadfhawesfds;ㅓ두ㅗㅇ러;뮈퍼ㅠㅏㅣ너ㅠㅗㅎ머ㅣㅠ이러ㅓ',
//     user: 'github:user1',
//   },
//   {
//     categories: {
//       safety: 4,
//       traffic: 4,
//       food: 4,
//       entertainment: 4,
//     },
//     text: '우하하하우하하하우하하하우하하하우하하하우하하하우하하하우하하하',
//     user: 'github:user2',
//   },
// ];

const TemporaryHashTagData: string[] = [
  '소음이 적은',
  '경관이 좋은',
  '문화시설이 가까운',
  '체육시설이 많은',
  '역이 가까운',
];

const DEFAULT_RATE_DATA: IMapInfo = {
  address: '',
  code: '',
  codeLength: 0,
  center: [37.541, 126.986],
  count: 2,
  categories: {
    safety: 8,
    traffic: 7,
    food: 9,
    entertainment: 9,
  },
};

const MainPage: React.FC = () => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [sidebarRate, setSidebarRate] = useState(DEFAULT_RATE_DATA);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const openSidebar = useCallback(() => {
    setSidebar(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebar(false);
  }, []);

  const updateSidebarRate = useCallback((rateData: IMapInfo) => {
    setSidebarRate(rateData);
  }, []);

  return (
    <MainDiv>
      <FlexContainer>
        <Map
          openSidebar={openSidebar}
          closeSidebar={closeSidebar}
          updateSidebarRate={updateSidebarRate}
          toggleSidebar={toggleSidebar}
        ></Map>
        {sidebar && (
          <Suspense fallback="loading...">
            <SidebarLazy
              sidebar={sidebar}
              rateData={sidebarRate}
              hashTagData={TemporaryHashTagData}
              closeSidebar={closeSidebar}
            ></SidebarLazy>
          </Suspense>
        )}
      </FlexContainer>
    </MainDiv>
  );
};

export default MainPage;
