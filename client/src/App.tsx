/* eslint-disable react/no-children-prop */
import {
  NotFoundPage,
  MainPage,
  ReviewPage,
  RankingPage,
  SignInPage,
  LoadingPage,
  SignUpPage,
  ProfilePage,
} from '@pages/index';
import ReviewModal from '@components/ReviewModal';
import { GlobalStore } from '@stores/index';
import GlobalStyle from '@styledComponents/GlobalStyle';
import myTheme from '@styledComponents/theme';
import Header from '@components/Header/index';

import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

const ContentWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App: React.FC = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={myTheme}>
        <GlobalStore>
          <ContentWrapper>
            <Header />

            <Switch location={background || location}>
              <Route exact path="/" component={MainPage} />
              <Route path="/review" component={ReviewPage} />
              <Route path="/signin" component={SignInPage} />
              <Route path="/github/callback" component={LoadingPage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/profile" component={ProfilePage} />
              <Route component={NotFoundPage} />
            </Switch>
            {background && (
              <Route path="/write-review" component={ReviewModal} />
            )}
            {background && <Route path="/ranking" render={RankingPage} />}
            {background && <Route path="/signin" render={SignInPage} />}
          </ContentWrapper>
        </GlobalStore>
      </ThemeProvider>
    </>
  );
};

export default App;
