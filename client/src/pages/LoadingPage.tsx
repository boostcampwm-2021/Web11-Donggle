import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { authState } from '@stores/atoms';
import useHistoryRouter from '@hooks/useHistoryRouter';
import LoadAnimation from '@components/Loading/index';
import { getToken, isMember } from '@controllers/signInController';
import { IAuthInfo } from '@myTypes/User';

const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.green};
  overflow: hidden;
`;

const LoadingPage: React.FC = () => {
  const [auth, setAuth] = useRecoilState<IAuthInfo>(authState);
  const [history, routeHistory] = useHistoryRouter();

  useEffect(() => {
    const confirmMember = async () => {
      const [status, userInfo] = await getToken();
      isMember(status, userInfo, routeHistory, auth, setAuth);
    };

    confirmMember();
  }, []);

  return (
    <>
      <Body>
        <LoadAnimation />
      </Body>
    </>
  );
};

export default LoadingPage;
