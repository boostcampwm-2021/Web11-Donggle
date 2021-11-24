import App from './App';
import { GlobalStore } from '@stores/index';
import GlobalStyle from '@styledComponents/GlobalStyle';
import myTheme from '@styledComponents/theme';
import cacheProvider from '@hooks/cacheProvider';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';

const MAX_POLYGONS = 10;
const EVICTION_POLICY: 'LFU' | 'LRU' = 'LFU';
const swrCacheProvider = () => cacheProvider(MAX_POLYGONS, EVICTION_POLICY);

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={myTheme}>
      <GlobalStore>
        <BrowserRouter>
          <SWRConfig value={{ provider: swrCacheProvider }}>
            <App />
          </SWRConfig>
        </BrowserRouter>
      </GlobalStore>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
