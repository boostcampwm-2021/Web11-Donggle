import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NotFoundPage, MainPage } from '@pages/index';
import { GlobalStore } from '@stores/index';
import GlobalStyle from '@styledComponents/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import myTheme from '@styledComponents/theme';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={myTheme}>
        <GlobalStore>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </BrowserRouter>
        </GlobalStore>
      </ThemeProvider>
    </>
  );
};

export default App;
