import App from './App';
import { GlobalStore } from '@stores/index';
import GlobalStyle from '@styledComponents/GlobalStyle';
import myTheme from '@styledComponents/theme';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={myTheme}>
      <GlobalStore>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalStore>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
