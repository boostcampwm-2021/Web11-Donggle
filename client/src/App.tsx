import { GlobalStore } from '@stores/index';
import GlobalStyle from '@styledComponents/GlobalStyle';
import myTheme from '@styledComponents/theme';
import Header from '@components/Header/index';
import Snackbar from '@components/Snackbar';
import PrivateRoute from '@routes/PrivateRoute';

import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

const MainPage = lazy(() => import('@pages/MainPage'));
const LoadPage = lazy(() => import('@pages/LoadPage'));
const LoadingPage = lazy(() => import('@pages/LoadingPage'));
const RankingPage = lazy(() => import('@pages/RankingPage'));
const SignInPage = lazy(() => import('@pages/SignInPage'));
const SignUpPage = lazy(() => import('@pages/SignUpPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage'));
const ProfileAddressPage = lazy(() => import('@pages/ProfileAddressPage'));
const ReviewSubmitPage = lazy(() => import('@pages/ReviewSubmitPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

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
            <Suspense fallback={<p>...Loading</p>}>
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
            </Suspense>
          </ContentWrapper>
        </GlobalStore>
      </ThemeProvider>
    </>
  );
};

export default App;
