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
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

const ContentWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        sessionStorage.getItem('jwt') ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin' }} />
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
              <Route path="/signin" component={SignInPage} />
              <Route path="/github/callback" component={LoadingPage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/profile" component={ProfilePage} />
              <Route component={NotFoundPage} />
            </Switch>
            {background && (
              <Route path="/write-review" component={ReviewSubmitPage} />
            )}
            {background && <Route path="/ranking" render={RankingPage} />}
            {background && <Route path="/signin" render={SignInPage} />}
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
