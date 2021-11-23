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
              pathname: '/map/signin',
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
              <Route path="/map" component={MainPage} />
              <Route path="/github/callback" component={LoadingPage} />
              <PrivateRoute path="/profile" component={ProfilePage} />
              <Route component={NotFoundPage} />
            </Switch>
            <PrivateRoute
              path="/map/write-review"
              component={ReviewSubmitPage}
            />
            <Route path="/map/ranking" render={RankingPage} />
            <Route path="/map/signin" component={SignInPage} />
            <PrivateRoute path="/map/signup" component={SignUpPage} />
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
