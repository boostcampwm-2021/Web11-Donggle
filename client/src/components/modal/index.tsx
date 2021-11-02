import React, { useState } from 'react';

import { ModalWrapper } from './index.style';
import closeButton from '@assets/closeButton.png';

// "상위 컴포넌트에서는 클릭하면 무조건 추가한다"로 로직을 구성
// recoil에서 전역ㅇ로 관리하는 것도 생각해 볼 수 있으려나..
function Modal(): JSX.Element {
  const [isActive, setIsActive] = useState(true);

  const onClick = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      {isActive && (
        <ModalWrapper>
          <img src={closeButton} alt="모달창닫기" onClick={onClick}></img>
        </ModalWrapper>
      )}
    </>
  );
}

export default Modal;
