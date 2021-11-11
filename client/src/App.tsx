/* eslint-disable react/no-children-prop */
import {
  NotFoundPage,
  MainPage,
  ReviewPage,
  RankingPage,
  LoginPage,
  CallbackPage,
} from '@pages/index';
import { GlobalStore } from '@stores/index';
import GlobalStyle from '@styledComponents/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import myTheme from '@styledComponents/theme';

import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={myTheme}>
        <GlobalStore>
          <Switch location={background || location}>
            <Route exact path="/" component={MainPage} />
            <Route path="/review" component={ReviewPage} />
            <Route path="/ranking" component={RankingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/github/callback" component={CallbackPage} />
            <Route component={NotFoundPage} />
          </Switch>
          {background && <Route path="/ranking" component={RankingPage} />}
          {background && <Route path="/login" component={LoginPage} />}
        </GlobalStore>
      </ThemeProvider>
    </>
  );
};

export default App;
