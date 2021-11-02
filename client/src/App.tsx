import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NotFoundPage, MainPage } from '@pages/index';
import { GlobalStore } from '@stores/index';
import { GlobalStyle } from '@styledComponents/index';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <GlobalStore>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </GlobalStore>
    </>
  );
};

export default App;
