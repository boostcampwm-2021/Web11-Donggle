import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NotFoundPage, MainPage } from '@pages/index';
import { GlobalStore } from '@stores/index';
import GlobalStyle from '@styledComponents/globalStyle';

<<<<<<< HEAD
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
=======
import Modal from '@components/modal/index';

function App() {
  return (
    <div className="App">
      <Modal></Modal>
    </div>
  );
}
>>>>>>> b91f94b (Feat: #2 - 모달창 레이아웃 만들기)

export default App;
