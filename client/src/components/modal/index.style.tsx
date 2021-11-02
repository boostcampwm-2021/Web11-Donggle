import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-60%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
  box-shadow: 0px 4px 10px rgba(51, 51, 51, 0.1),
    0px 0px 4px rgba(51, 51, 51, 0.05);
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
`;
