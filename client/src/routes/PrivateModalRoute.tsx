import React from 'react';
import { Route, Redirect, RouterProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '@stores/atoms';

const PrivateModalRoute: React.FC<RouterProps> = ({
  component: Component,
  ...rest
}) => {
  const auth = useRecoilValue(authState);

  const checkRoute = () => {
    return auth.isLoggedin ? <Component /> : <Redirect to="/map/signin" />;
  };

  return <Route {...rest} render={checkRoute} />;
};

export default PrivateModalRoute;
