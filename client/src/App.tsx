import { GlobalStore } from '@stores/index';
import GlobalStyle from '@styledComponents/GlobalStyle';
import myTheme from '@styledComponents/theme';
import Snackbar from '@components/Snackbar';
import PrivateRoute from '@routes/PrivateRoute';
import ProtectRoute from '@routes/ProtectRoute';
import { getOptions } from '@utils/common';

import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import LoadAnimation from '@components/Loading';
import Header from '@components/Header';
import { LoadingPage } from '@pages/index';

const MainPage = lazy(() => import('@pages/MainPage'));
const LoadPage = lazy(() => import('@pages/LoadPage'));
const RankingModal = lazy(() => import('@modals/RankingModal'));
const SignInModal = lazy(() => import('@modals/SignInModal'));
const SignUpModal = lazy(() => import('@modals/SignUpModal'));
const ProfilePage = lazy(() => import('@pages/ProfilePage'));
const ProfileAddressModal = lazy(() => import('@modals/ProfileAddressModal'));
const ReviewSubmitModal = lazy(() => import('@modals/ReviewSubmitModal'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

const App: React.FC = () => {
  useEffect(() => {
    const deleteCookie = () => {
      fetch(
        `${process.env.REACT_APP_API_URL as string}/api/auth/unload`,
        getOptions('GET', undefined, 'same-origin'),
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
              path="/:back/write-review"
              component={ReviewSubmitModal}
              needSignIn={true}
            />
            <Route path="/:back/ranking" render={() => <RankingModal />} />
            <Route path="/:back/signin" render={() => <SignInModal />} />
            <ProtectRoute path="/:back/signup" compoent={SignUpModal} />
            <PrivateRoute
              path="/:back/update-address"
              component={ProfileAddressModal}
              needSignIn={true}
            />
          </Suspense>
        </GlobalStore>
      </ThemeProvider>
    </>
  );
};

export default App;
