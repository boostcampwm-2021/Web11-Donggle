/* eslint-disable react/no-children-prop */
import {
  NotFoundPage,
  MainPage,
  ReviewPage,
  ReviewSubmitPage,
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

import React, { useCallback } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  RouterProps,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

const ContentWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const pathExceptions = [
  '/write-review',
  '/ranking',
  '/signin',
  '/signup',
  '/profile/update-address',
];

const PrivateRoute: React.FC<RouterProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        sessionStorage.getItem('jwt') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: {
                background: {
                  pathname: '/',
                },
              },
            }}
          />
        )
      }
    />
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  const routeAgain = useCallback((to: string) => {
    const paths = to.match(/\/[^\/]*/);
    if (paths === null) {
      return <NotFoundPage />;
    }
    const background = { pathname: paths[0] };
    background.pathname =
      background.pathname === to ? '/' : background.pathname;
    return (
      <Redirect
        to={{
          pathname: to,
          state: {
            background,
          },
        }}
      />
    );
  }, []);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={myTheme}>
        <GlobalStore>
          <ContentWrapper>
            <Snackbar />
            <Header />
            <Switch location={background || location}>
              <Route exact path="/" component={MainPage} />
              <Route path="/github/callback" component={LoadingPage} />
              <PrivateRoute path="/profile" component={ProfilePage} />
              {pathExceptions.includes(location.pathname) ? (
                routeAgain(location.pathname)
              ) : (
                <Route component={NotFoundPage} />
              )}
            </Switch>
            {background && (
              <PrivateRoute path="/write-review" component={ReviewSubmitPage} />
            )}
            {background && <Route path="/ranking" render={RankingPage} />}
            {background && <Route path="/signin" component={SignInPage} />}
            {background && <Route path="/signup" component={SignUpPage} />}
            {background && (
              <Route
                path="/profile/update-address"
                component={ProfileAddressPage}
              />
            )}
          </ContentWrapper>
        </GlobalStore>
      </ThemeProvider>
    </>
  );
};

export default App;
