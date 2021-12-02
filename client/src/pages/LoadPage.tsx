import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { authState } from '@stores/atoms';
import useHistoryRouter from '@hooks/useHistoryRouter';
import LoadAnimation from '@components/Loading/index';
import { checkUserSignIn } from '@controllers/loadController';
import { IAuthInfo } from '@myTypes/User';
import { ILocationBase } from '@myTypes/Common';
import { abortSingleController } from '@utils/common';

const LoadPage: React.FC = () => {
  const [auth, setAuth] = useRecoilState<IAuthInfo>(authState);
  const routeHistory = useHistoryRouter();
  const location = useLocation<ILocationBase>();

  useEffect(() => {
    abortSingleController().controller.abort();
    checkUserSignIn(setAuth, routeHistory, location);
  }, []);

  return <LoadAnimation />;
};

export default LoadPage;
