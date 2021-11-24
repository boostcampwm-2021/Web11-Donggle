import {
  NotFoundPage,
  MainPage,
  ReviewSubmitPage,
  LoadPage,
  RankingPage,
  SignInPage,
  LoadingPage,
  SignUpPage,
  ProfilePage,
  ProfileAddressPage,
} from '@pages/index';
import { GlobalStore } from '@stores/index';
import GlobalStyle from '@styledComponents/GlobalStyle';
import myTheme from '@styledComponents/theme';
import Header from '@components/Header/index';
import Snackbar from '@components/Snackbar';
import PrivateRoute from '@routes/PrivateRoute';

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

const ContentWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={myTheme}>
        <GlobalStore>
          <ContentWrapper>
            <Snackbar />
            <Header />
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Redirect to={{ pathname: '/map' }} />}
              />
              <Route path="/map" render={() => <MainPage />} />
              <Route path="/github/callback" render={() => <LoadingPage />} />
              <Route path="/loading" render={() => <LoadPage />} />
              <PrivateRoute path="/profile" component={ProfilePage} />
              <Route render={() => <NotFoundPage />} />
            </Switch>
            <PrivateRoute
              path="/map/write-review"
              component={ReviewSubmitPage}
            />
            <Route path="/map/ranking" render={() => <RankingPage />} />
            <Route path="/map/signin" component={SignInPage} />
            <Route path="/map/signup" render={() => <SignUpPage />} />
            <PrivateRoute
              path="/profile/update-address"
              component={ProfileAddressPage}
            />
          </ContentWrapper>
        </GlobalStore>
      </ThemeProvider>
    </>
  );
};

export default App;
