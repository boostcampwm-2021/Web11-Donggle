import React, { useState } from 'react';
import { OpenDetailBtn, CloseDetailBtn } from './index.style';

const DetailBtn: React.FC = ({ children }) => {
  const [isDetailActive, setIsDetailActive] = useState(false);
  const detailBtnClick = () => {
    setIsDetailActive(!isDetailActive);
  };
  return (
    <>
      {isDetailActive ? (
        <>
          {children}
          <CloseDetailBtn onClick={() => detailBtnClick()}>닫기</CloseDetailBtn>
        </>
      ) : (
        <OpenDetailBtn onClick={() => detailBtnClick()}>
          자세히보기
        </OpenDetailBtn>
      )}
    </>
  );
};

export default DetailBtn;
