import React from 'react';
import { Route, Redirect, useLocation, RouterProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '@stores/atoms';

const PrivateRoute: React.FC<RouterProps> = ({
  component: Component,
  needSignIn: needSignIn,
  ...rest
}) => {
  const auth = useRecoilValue(authState);
  const location = useLocation();

  const checkAll = () => {
    try {
      const expireTime = sessionStorage.getItem('timer');

      if (!expireTime) {
        //로그인을 안 한 상태
        if (needSignIn) {
          return <Redirect to={{ pathname: '/map/signin' }} />;
        } else {
          return <Component />;
        }
      }
      if (!auth.isLoggedin) {
        //로그인은 했지만 새로고침
        return <Redirect to={{ pathname: '/loading', state: location }} />;
      }

      const now = new Date();
      const currentTime = now.getTime();
      if (currentTime - Number(expireTime) > 300e3) {
        //로그인한 상태인데 token이 만료
        return <Redirect to={{ pathname: '/loading', state: location }} />;
      } else {
        //로그인한 상태이며 token이 유효한 상태
        return <Component />;
      }
    } catch (error) {
      alert(error);
      return <Redirect to={{ pathname: '/map/signin' }} />;
    }
  };

  return <Route {...rest} render={checkAll} />;
};

export default PrivateRoute;
