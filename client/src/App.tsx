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

import React from 'react';
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
              <Route path="/review" component={ReviewPage} />
              <Route path="/github/callback" component={LoadingPage} />
              <PrivateRoute path="/profile" component={ProfilePage} />
              <PrivateRoute path="/write-review" component={ReviewSubmitPage} />
              <Route component={NotFoundPage} />
            </Switch>
            {background && <Route path="/ranking" render={RankingPage} />}
            {background && <Route path="/signin" component={SignInPage} />}
            {background && (
              <Route
                path="/profile/update-address"
                component={ProfileAddressPage}
              />
            )}
            {background && <Route path="/signup" component={SignUpPage} />}
          </ContentWrapper>
        </GlobalStore>
      </ThemeProvider>
    </>
  );
};

export default App;
