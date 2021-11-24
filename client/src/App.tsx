/* eslint-disable react/no-children-prop */
import {
  NotFoundPage,
  MainPage,
  ReviewPage,
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
import { isJwtExpired } from 'jwt-check-expiration';

import React, { useState, useCallback, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  RouterProps,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useRecoilState } from 'recoil';
import { authState } from '@stores/atoms';

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
  const [auth, setAuth] = useRecoilState(authState);
  const location = useLocation();

  const checkAll = (props) => {
    try {
      const token = sessionStorage.getItem('jwt');

      if (!token) {
        //로그인을 안 한 상태
        return <Redirect to={{ pathname: '/map/signin' }} />;
      }
      if (!auth.isLoggedin) {
        //로그인은 했지만 새로고침
        return <Redirect to={{ pathname: '/loading', state: location }} />;
      }

      if (isJwtExpired(token)) {
        //로그인한 상태인데 token이 만료
        return <Redirect to={{ pathname: '/loading', state: location }} />;
      } else {
        //로그인한 상태이며 token이 유효한 상태
        return <Component {...props} />;
      }
    } catch (error) {
      alert(error);
      return <Redirect to={{ pathname: '/map/signin' }} />;
    }
  };

  return <Route {...rest} render={checkAll} />;
};

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
