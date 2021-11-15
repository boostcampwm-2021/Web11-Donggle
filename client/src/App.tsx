/* eslint-disable react/no-children-prop */
import {
  NotFoundPage,
  MainPage,
  ReviewPage,
  RankingPage,
  LoginPage,
  CallbackPage,
  SignInPage,
} from '@pages/index';
import ReviewModal from '@components/ReviewModal';
import { GlobalStore } from '@stores/index';
import GlobalStyle from '@styledComponents/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import myTheme from '@styledComponents/theme';

import React from 'react';
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
            <Route path="/login" component={LoginPage} />
            <Route path="/github/callback" component={CallbackPage} />
            <Route path="/signin" component={SignInPage} />
            <Route component={NotFoundPage} />
          </Switch>
          {background && <Route path="/write-review" component={ReviewModal} />}
          {background && <Route path="/ranking" render={RankingPage} />}
          {background && <Route path="/login" render={LoginPage} />}
        </GlobalStore>
      </ThemeProvider>
    </>
  );
};

export default App;
