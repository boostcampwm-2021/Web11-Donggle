import React from 'react';
import { Redirect } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return <Redirect to="/map" />;
};

export default NotFoundPage;
