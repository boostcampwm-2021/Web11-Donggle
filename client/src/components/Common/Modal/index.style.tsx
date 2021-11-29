import xIcon from '@assets/icons/x.svg';

import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: visible;

  z-index: 3000;
`;

const ModalWrapper = styled.div`
  position: absolute;
  width: 500px;
  height: auto;
  max-height: 90%;
  top: 50%;
  left: 50%;
  overflow-y: scroll;
  transform: translate(-50%, -50%);
  ${(props) => props.theme.common.flexColumn};
  justify-content: space-between;

  padding: 20px;
  box-shadow: 0px 4px 10px rgba(51, 51, 51, 0.1),
    0px 0px 4px rgba(51, 51, 51, 0.05);
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.white};

  z-index: 3000;

  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme?.colors?.lightgrey ?? '#70C49D'};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme?.colors?.ashgrey ?? '#666362'};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme?.colors?.lightgrey ?? '#70C49D'};
    border-radius: 5px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const ModalCloseBtnDiv = styled.div`
  ${(props) => props.theme.common.flexRow};
  justify-content: flex-end;
  width: 100%;
`;

const ModalCloseImage = styled.img`
  width: 100%;
  height: 100%;
`;
ModalCloseImage.defaultProps = { src: xIcon };

const ModalCloseBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const ChildrenWrapper = styled.div`
  position: relative;
  margin: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: visible;
`;

export {
  ModalOverlay,
  ModalWrapper,
  ModalCloseBtnDiv,
  ModalCloseImage,
  ModalCloseBtn,
  ChildrenWrapper,
};
