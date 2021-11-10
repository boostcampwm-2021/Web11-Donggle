import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { tempState } from '@stores/atoms';

const TempMainPage = styled.div`
  width: 100vh;
  height: 100vh;
  background: green;
`;

/*
  2021-11-02
  홍승용
  임시 예제 컴포넌트입니다. recoil atom의 값 변화시킴
*/
const TempCounter: React.FC = (props) => {
  const setTemp = useSetRecoilState(tempState);

  useEffect(() => {
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1);
    }, 500);
  }, []);

  return <>counting...</>;
};

export default TempCounter;
