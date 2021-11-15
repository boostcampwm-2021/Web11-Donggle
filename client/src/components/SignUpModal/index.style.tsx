import styled, { css } from 'styled-components';

interface SubmitButton {
  cancel: boolean;
}

const sizeReact = css`
  width: 50vw;
  padding: 5vh;
`;

export const SignUpTitle = styled.div`
  ${sizeReact}
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

export const ButtonWrapper = styled.div`
  ${sizeReact}
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const SubmitButton = styled.button<SubmitButton>`
  width: 12vw;
  height: 5vh;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.cancel ? '#70C49D' : '#33AB74')};
  color: ${(props) => props.theme.colors.white};
`;
