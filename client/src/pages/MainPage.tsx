import Header from '@components/Header';
import Modal from '@components/modal/index';
import Map from '@components/Map/index';

import React, { useState } from 'react';
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
  min-width: 1000px;
  height: 100%;
  flex: 1 1 0;
`;

// Rate, Review 는 Backend에서 아래와 같은 형식으로 반환한다고 가정
export interface TempRateType {
  address: string;
  code: string;
  codeLength: number;
  center: [number, number];
  total: number;
  count: number;
  categories: {
    safety: number;
    traffic: number;
    food: number;
    entertainment: number;
  };
}

export interface TempReviewType {
  categories: {
    safety: number;
    traffic: number;
    food: number;
    entertainment: number;
  };
  text: string;
  user: string;
}

// Backend API 반환 데이터 가정
const TemporaryRateData: TempRateType = {
  address: '서울시 관악구 신림동',
  code: '1121069',
  codeLength: 7,
  center: [37.48756349263078, 126.9283814947558],
  total: 9,
  count: 2,
  categories: {
    safety: 8,
    traffic: 7,
    food: 9,
    entertainment: 9,
  },
};

const TemporaryReviewData: TempReviewType[] = [
  {
    categories: {
      safety: 4,
      traffic: 4,
      food: 5,
      entertainment: 3,
    },
    text: 'ㄴㅇㅁㄹ머ㅗㅇ피ㅓ멀호매asdfasdfgadfhawesfds;ㅓ두ㅗㅇ러;뮈퍼ㅠㅏㅣ너ㅠㅗㅎ머ㅣㅠ이러ㅓ',
    user: 'github:user1',
  },
  {
    categories: {
      safety: 4,
      traffic: 4,
      food: 4,
      entertainment: 4,
    },
    text: '우하하하우하하하우하하하우하하하우하하하우하하하우하하하우하하하',
    user: 'github:user2',
  },
];

const TemporaryHashTagData: string[] = [
  '소음이 적은',
  '경관이 좋은',
  '문화시설이 가까운',
  '체육시설이 많은',
  '역이 가까운',
];

const MainPage: React.FC = () => {
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
          rateData={TemporaryRateData}
          reviewData={TemporaryReviewData}
          hashTagData={TemporaryHashTagData}
          closeSidebar={closeSidebar}
        ></Sidebar>
      </FlexContainer>
    </MainDiv>
  );
};

export default MainPage;
