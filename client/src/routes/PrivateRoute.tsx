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
      //로그인을 하지 않은 상태 또는 로그인은 했지만 새로고침
      return (
        <Redirect
          to={{ pathname: '/loading', state: { isRoute: true, ...location } }}
        />
      );
    }
    //로그인한 상태
    return <Component />;
  };

  return <Route {...rest} render={checkAll} />;
};

export default PrivateRoute;
