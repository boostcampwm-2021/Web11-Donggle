/* eslint-disable react/no-children-prop */
import {
  NotFoundPage,
  MainPage,
  ReviewPage,
  RankingPage,
  SignInPage,
<<<<<<< HEAD
  LoadingPage,
  SignUpPage,
=======
  ProfilePage,
>>>>>>> Feat: #69 - 프로필 페이지 라우팅 구현
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
            <Route path="/signin" component={SignInPage} />
            <Route path="/github/callback" component={LoadingPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route component={NotFoundPage} />
          </Switch>
          {background && <Route path="/write-review" component={ReviewModal} />}
          {background && <Route path="/ranking" render={RankingPage} />}
          {background && <Route path="/signin" render={SignInPage} />}
        </GlobalStore>
      </ThemeProvider>
    </>
  );
};

export default App;
