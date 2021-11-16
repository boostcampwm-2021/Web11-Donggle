import {
  ModalOverlay,
  ModalWrapper,
  ModalCloseBtnDiv,
  ModalCloseImage,
  ModalCloseBtn,
  ChildrenWrapper,
} from '@components/Common/Modal/index.style';

import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

interface ModalProps {
  toggleModal?: () => void;
}

// "상위 컴포넌트에서는 클릭하면 무조건 추가한다"로 로직을 구성
// recoil에서 전역ㅇ로 관리하는 것도 생각해 볼 수 있으려나..
const Modal: React.FC<ModalProps> = ({ children, toggleModal }) => {
  const history = useHistory();
  const [isActive, setIsActive] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  const onClick = () => {
    setIsActive(!isActive);
  };

  // scroll 작동 금지
  // https://medium.com/@bestseob93/%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%AA%A8%EB%8B%AC-react-modal-%EB%A7%8C%EB%93%A4%EA%B8%B0-bd003458e9d 참고
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);

  // 모달창 바깥 클릭 시 모달창 없애기
  // https://chach4.tistory.com/4 참고
  // useEffect(() => {
  //   const handleCloseModal = (e) => {
  //     if (
  //       !e.target.closest('.overlay-confirmation-submit') &&
  //       e.target.closest('.overlay-confirmation-alert')
  //     ) {
  //       return;
  //     }
  //     if (
  //       isActive &&
  //       (!modalRef.current || !modalRef.current.contains(e.target))
  //     ) {
  //       console.log(!modalRef?.current?.contains(e.target));
  //       console.log(e.target.closest('.modal'));
  //       console.log(e.target.closest('body'));
  //       console.log(e.target);
  //       setIsActive(!isActive);
  //       history.goBack();
  //       if (toggleModal) {
  //         toggleModal();
  //       }
  //     }
  //   };

  //   if (isActive) {
  //     window.addEventListener('click', handleCloseModal);
  //   } else {
  //     window.removeEventListener('click', handleCloseModal);
  //   }

  //   return () => {
  //     window.removeEventListener('click', handleCloseModal);
  //   };
  // }, [isActive]);

  return (
    <>
      {isActive && (
        <ModalOverlay>
          <ModalWrapper className="modal" ref={modalRef}>
            <ModalCloseBtnDiv>
              <ModalCloseBtn onClick={onClick}>
                <ModalCloseImage />
              </ModalCloseBtn>
            </ModalCloseBtnDiv>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </ModalWrapper>
        </ModalOverlay>
      )}
    </>
  );
};

export default Modal;
