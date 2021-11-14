import styled from 'styled-components';

interface SubmitButton {
  cancel: boolean;
}

const TitleWrapper = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const SubmitButton = styled.button<SubmitButton>`
  width: 60px;
  height: 40px;
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
`;

export { TitleWrapper, ButtonWrapper, SubmitButton };
