import { GlobalStore } from '@stores/index';
import GlobalStyle from '@styledComponents/GlobalStyle';
import myTheme from '@styledComponents/theme';
import Snackbar from '@components/Snackbar';
import PrivateRoute from '@routes/PrivateRoute';
import ProtectRoute from '@routes/ProtectRoute';

import React, { lazy, Suspense } from 'react';
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
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={myTheme}>
        <GlobalStore>
          <Snackbar />
          <Header />
          <Suspense fallback={<LoadAnimation />}>
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Redirect to={{ pathname: '/map' }} />}
              />
              <Route path="/map" render={() => <MainPage />} />
              <Route path="/github/callback" render={() => <LoadingPage />} />
              <ProtectRoute path="/loading" component={LoadPage} />
              <PrivateRoute path="/profile" component={ProfilePage} />
              <Route render={() => <NotFoundPage />} />
            </Switch>
          </Suspense>
          <Suspense fallback={null}>
            <PrivateRoute
              path="/:back/write-review"
              component={ReviewSubmitModal}
            />
            <Route path="/:back/ranking" render={() => <RankingModal />} />
            <Route path="/:back/signin" render={() => <SignInModal />} />
            <ProtectRoute path="/:back/signup" compoent={SignUpModal} />
            <PrivateRoute
              path="/:back/update-address"
              component={ProfileAddressModal}
            />
          </Suspense>
        </GlobalStore>
      </ThemeProvider>
    </>
  );
};

export default App;
