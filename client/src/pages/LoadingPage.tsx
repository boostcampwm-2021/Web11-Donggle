import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { authState } from '@stores/atoms';
import useHistoryRouter from '@hooks/useHistoryRouter';
import LoadAnimation from '@components/Loading/index';
import { getToken, isMember } from '@controllers/signInController';
import { IAuthInfo } from '@myTypes/User';

const LoadingPage: React.FC = () => {
  const [auth, setAuth] = useRecoilState<IAuthInfo>(authState);
  const routeHistory = useHistoryRouter();

  useEffect(() => {
    const confirmMember = async () => {
      const [status, userInfo] = await getToken();
      isMember(status, userInfo, routeHistory, auth, setAuth);
    };

    confirmMember();
  }, []);

  return <LoadAnimation />;
};

export default LoadingPage;
