import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Noto Sans KR";
  }
`;

export default GlobalStyle;
