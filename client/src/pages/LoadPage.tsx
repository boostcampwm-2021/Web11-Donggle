import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { authState } from '@stores/atoms';
import useHistoryRouter from '@hooks/useHistoryRouter';
import LoadAnimation from '@components/Loading/index';
import { IAuthInfo } from '@myTypes/User';
import { checkUserSignIn } from '@controllers/loadController';

const LoadPage: React.FC = () => {
  const [auth, setAuth] = useRecoilState<IAuthInfo>(authState);
  const routeHistory = useHistoryRouter();
  const location = useLocation();

  useEffect(() => {
    checkUserSignIn(setAuth, routeHistory, location);
  }, []);

  return <LoadAnimation />;
};

export default LoadPage;
