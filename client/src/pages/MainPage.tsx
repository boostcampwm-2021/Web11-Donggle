import Header from '@components/Header';
import Modal from '@components/modal/index';
import Map from '@components/Map/index';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { tempState } from '@stores/atoms';
import { TempCounter } from '@components/index';

const TempMainPage = styled.div`
  width: 100vw;
  height: 100vh;
`;

/*
  2021-11-02
  홍승용
  임시 예제 코드입니다. router내부에서 history객체를 활용하려면 props의 type으로 RouteComponentsProps를 사용해야 합니다.
*/
const MainPage: React.FC = (props: RouteComponentProps) => {
  const [temp, setTemp] = useRecoilState(tempState);

  console.log(props.history);

  return (
    <TempMainPage>
      <Header></Header>
      <Map></Map>
    </TempMainPage>
  );
};

export default MainPage;
