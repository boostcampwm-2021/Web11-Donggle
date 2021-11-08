import Header from '@components/Header';
import Modal from '@components/modal/index';
import Map from '@components/Map/index';

import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { tempState } from '@stores/atoms';
import { TempCounter } from '@components/index';

const MainDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

/*
  2021-11-02
  홍승용
  임시 예제 코드입니다. router내부에서 history객체를 활용하려면 props의 type으로 RouteComponentsProps를 사용해야 합니다.
*/
const MainPage: React.FC = () => {
  const [temp, setTemp] = useRecoilState(tempState);

  return (
    <MainDiv>
      <Header></Header>
      <Map></Map>
    </MainDiv>
  );
};

export default MainPage;
