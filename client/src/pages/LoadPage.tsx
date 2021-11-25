import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { authState } from '@stores/atoms';
import useHistoryRouter from '@hooks/useHistoryRouter';
import LoadAnimation from '@components/Loading/index';
import { IAuthInfo } from '@myTypes/User';
import { refreshTokenUser } from '@controllers/loadController';

const LoadPage: React.FC = () => {
  const [auth, setAuth] = useRecoilState<IAuthInfo>(authState);
  const routeHistory = useHistoryRouter();
  const location = useLocation();

  useEffect(() => {
    refreshTokenUser(auth, setAuth, routeHistory, location);
  }, []);

  return <LoadAnimation />;
};

export default LoadPage;
