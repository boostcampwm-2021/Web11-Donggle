import React from 'react';
import { Route, Redirect, useLocation, RouterProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '@stores/atoms';

const PrivateRoute: React.FC<RouterProps> = ({
  component: Component,
  ...rest
}) => {
  const auth = useRecoilValue(authState);
  const location = useLocation();

  const checkAll = () => {
    if (!auth.isLoggedin) {
      /*
      2021-12-02
      문혜현
      요청을 취소하는 명령어이지만 publicRoute의 useEffect에서 요청이 시작되기 바로 직전에 선언하니까 요청자체가 가지 않는 현상이 일어남
      */
      //abortSingleController().controller.abort();
      return (
        <Redirect
          to={{ pathname: '/loading', state: { isRoute: true, ...location } }}
        />
      );
    }
    return <Component />;
  };

  return <Route {...rest} render={checkAll} />;
};

export default PrivateRoute;
