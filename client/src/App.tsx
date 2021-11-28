import { GlobalStore } from '@stores/index';
import GlobalStyle from '@styledComponents/GlobalStyle';
import myTheme from '@styledComponents/theme';
import Header from '@components/Header/index';
import Snackbar from '@components/Snackbar';
import PrivateRoute from '@routes/PrivateRoute';
import ProtectRoute from '@routes/ProtectRoute';
import { getOptions } from '@utils/common';

import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import LoadAnimation from '@components/Loading';
import { LoadingPage } from '@pages/index';

const MainPage = lazy(() => import('@pages/MainPage'));
const LoadPage = lazy(() => import('@pages/LoadPage'));
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
  useEffect(() => {
    const deleteCookie = () => {
      fetch(
        `${process.env.REACT_APP_API_URL as string}/api/auth/unload`,
        getOptions('GET', undefined, 'include'),
      );
    };
    window.addEventListener('unload', deleteCookie);
    return () => {
      window.removeEventListener('unload', deleteCookie);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={myTheme}>
        <GlobalStore>
          <ContentWrapper>
            <Suspense fallback={<LoadAnimation />}>
              <Snackbar />
              <Header />
              <Switch>
                <Route
                  exact
                  path="/"
                  component={() => <Redirect to={{ pathname: '/map' }} />}
                />
                <PrivateRoute
                  path="/map"
                  component={MainPage}
                  needSignIn={false}
                />
                <Route path="/github/callback" render={() => <LoadingPage />} />
                <ProtectRoute path="/loading" component={LoadPage} />
                <PrivateRoute
                  path="/profile"
                  component={ProfilePage}
                  needSignIn={true}
                />
                <Route render={() => <NotFoundPage />} />
              </Switch>
              <PrivateRoute
                path="/map/write-review"
                component={ReviewSubmitPage}
                needSignIn={true}
              />
              <Route path="/map/ranking" render={() => <RankingPage />} />
              <Route path="/map/signin" render={() => <SignInPage />} />
              <ProtectRoute path="/map/signup" component={SignUpPage} />
              <PrivateRoute
                path="/profile/update-address"
                component={ProfileAddressPage}
                needSignIn={true}
              />
            </Suspense>
          </ContentWrapper>
        </GlobalStore>
      </ThemeProvider>
    </>
  );
};

export default App;
