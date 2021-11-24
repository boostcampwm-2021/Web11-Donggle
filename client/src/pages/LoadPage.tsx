import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { authState } from '@stores/atoms';
import useHistoryRouter from '@hooks/useHistoryRouter';
import LoadAnimation from '@components/Loading/index';
import { IAuthInfo } from '@myTypes/User';
import { refreshTokenUser } from '@controllers/loadController';

const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.green};
  overflow: hidden;
`;

const LoadPage: React.FC = () => {
  const [auth, setAuth] = useRecoilState<IAuthInfo>(authState);
  const routeHistory = useHistoryRouter();
  const location = useLocation();

  useEffect(() => {
    refreshTokenUser(auth, setAuth, routeHistory, location);
  }, []);

  return (
    <>
      <Body>
        <LoadAnimation />
      </Body>
    </>
  );
};

export default LoadPage;
