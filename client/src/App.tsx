import GlobalStyle from '@styledComponents/GlobalStyle';
import myTheme from '@styledComponents/theme';
import Snackbar from '@components/Snackbar';
import PrivateRoute from '@routes/PrivateRoute';
import ProtectRoute from '@routes/ProtectRoute';
import PublicRoute from '@routes/PublicRoute';

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
        <Snackbar />
        <Header />
        <Suspense fallback={<LoadAnimation />}>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Redirect to={{ pathname: '/map' }} />}
            />
            <PublicRoute path="/map" component={MainPage} />
            <ProtectRoute path="/loading" component={LoadPage} />
            <PrivateRoute path="/profile" component={ProfilePage} />
            <Route path="/github/callback" render={() => <LoadingPage />} />
            <Route render={() => <NotFoundPage />} />
          </Switch>
        </Suspense>
        <Suspense fallback={null}>
          <PrivateRoute
            path="/:back/write-review"
            component={ReviewSubmitModal}
          />
          <ProtectRoute path="/map/signup" component={SignUpModal} />
          <Route path="/:back/ranking" render={() => <RankingModal />} />
          <Route path="/:back/signin" render={() => <SignInModal />} />
          <Route
            path="/profile/update-address"
            render={() => <ProfileAddressModal />}
          />
        </Suspense>
      </ThemeProvider>
    </>
  );
};

export default App;
