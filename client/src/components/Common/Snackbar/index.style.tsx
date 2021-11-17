import styled from 'styled-components';

const SnackbarWrapper = styled.div<{ duration: number; error: boolean }>`
  position: fixed;
  bottom: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  background: ${(props) => props.theme.colors.green};
  color: ${(props) =>
    props.error ? props.theme.colors.yellow : props.theme.colors.white};
  border-radius: 10px;
  animation-name: pop;
  animation-duration: ${(props) => props.duration}s;
  animation-fill-mode: forwards;

  @keyframes pop {
    0% {
      bottom: -50px;
    }
    20% {
      bottom: 0px;
    }
    80% {
      bottom: 0px;
    }
    100% {
      bottom: -50px;
    }
  }
`;

export { SnackbarWrapper };
