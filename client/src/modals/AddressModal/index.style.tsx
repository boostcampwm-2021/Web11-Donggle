import React from 'react';
import styled from 'styled-components';

interface SubmitButton {
  cancel: boolean;
}

const ModalSizer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const TitleWrapper = React.memo(styled.div`
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
`);

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const SubmitButton = React.memo(styled.button<SubmitButton>`
  width: 80px;
  height: 60px;
  border: none;
  border-radius: 8px;
  background: ${(props) =>
    props.cancel ? props.theme.colors.white : props.theme.colors.lightgreen};
  color: ${(props) =>
    props.cancel ? props.theme.colors.lightgreen : props.theme.colors.white};
  cursor: pointer;
  :hover {
    background: ${(props) =>
      props.cancel ? props.theme.colors.white : props.theme.colors.green};
    color: ${(props) =>
      props.cancel ? props.theme.colors.green : props.theme.colors.white};
  }
`);

export { ModalSizer, TitleWrapper, ButtonWrapper, SubmitButton };
