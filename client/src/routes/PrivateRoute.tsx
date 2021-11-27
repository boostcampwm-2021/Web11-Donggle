import React from 'react';
import { Route, Redirect, useLocation, RouterProps } from 'react-router-dom';
import { isJwtExpired } from 'jwt-check-expiration';
import { useRecoilValue } from 'recoil';
import { authState } from '@stores/atoms';

const PrivateRoute: React.FC<RouterProps> = ({
  component: Component,
  ...rest
}) => {
  const auth = useRecoilValue(authState);
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

export default PrivateRoute;
