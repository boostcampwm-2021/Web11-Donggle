import React from 'react';
import { Route, Redirect, useLocation, RouterProps } from 'react-router-dom';

const ProtectRoute: React.FC<RouterProps> = ({
  component: Component,
  ...rest
}) => {
  const location = useLocation();

  const checkRoute = () => {
    return location.state?.isRoute ? <Component /> : <Redirect to="/map" />;
  };

  return <Route {...rest} render={checkRoute} />;
};

export default ProtectRoute;
