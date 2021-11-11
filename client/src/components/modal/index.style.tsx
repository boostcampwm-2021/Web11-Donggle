import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);

  z-index: 99;
`;

const ModalWrapper = styled.div`
  position: absolute;
  max-width: 80%;
  width: 500px;
  max-height: 80%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${(props) => props.theme.common.flexColumn};
  justify-content: space-between;

  padding: 20px;
  box-shadow: 0px 4px 10px rgba(51, 51, 51, 0.1),
    0px 0px 4px rgba(51, 51, 51, 0.05);
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.white};

  z-index: 100;
`;

const ModalCloseBtnDiv = styled.div`
  ${(props) => props.theme.common.flexRow};
  justify-content: flex-end;
  width: 100%;
`;

const ModalCloseBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export { ModalOverlay, ModalWrapper, ModalCloseBtnDiv, ModalCloseBtn };
