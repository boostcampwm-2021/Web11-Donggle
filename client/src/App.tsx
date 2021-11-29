import { GlobalStore } from '@stores/index';
import GlobalStyle from '@styledComponents/GlobalStyle';
import myTheme from '@styledComponents/theme';
import Snackbar from '@components/Snackbar';
import PrivateRoute from '@routes/PrivateRoute';

import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import LoadAnimation from '@components/Loading';
import Header from '@components/Header';
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

const App: React.FC = () => {
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
              <Route path="/loading" render={() => <LoadPage />} />
              <PrivateRoute
                path="/profile"
                component={ProfilePage}
                needSignIn={true}
              />
              <Route render={() => <NotFoundPage />} />
            </Switch>
            <PrivateRoute
              path="/:back/write-review"
              component={ReviewSubmitPage}
              needSignIn={true}
            />
            <Route path="/:back/ranking" render={() => <RankingPage />} />
            <Route path="/:back/signin" render={() => <SignInPage />} />
            <Route path="/:back/signup" render={() => <SignUpPage />} />
            <PrivateRoute
              path="/:back/update-address"
              component={ProfileAddressPage}
              needSignIn={true}
            />
          </Suspense>
        </GlobalStore>
      </ThemeProvider>
    </>
  );
};

export default App;
