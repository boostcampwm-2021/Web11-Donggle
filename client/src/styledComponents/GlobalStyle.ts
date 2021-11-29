import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: "Noto Sans KR";
  }

  #root {
    width: 100%;
    height: 100%;
    position: relative;
  }

  button {
    border: none;
  }
`;

export default GlobalStyle;
