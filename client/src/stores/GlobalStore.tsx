import React from 'react';
import { RecoilRoot } from 'recoil';

const GlobalStore: React.FC = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default GlobalStore;
