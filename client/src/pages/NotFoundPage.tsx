import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <h1>Error Code 404</h1>
      <h2>{window.location.href} Not Found!</h2>
    </>
  );
};

export default NotFoundPage;
