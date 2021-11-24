import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { authState } from '@stores/atoms';
import useHistoryRouter from '@hooks/useHistoryRouter';
import LoadAnimation from '@components/Loading/index';
import { IAuthInfo } from '@myTypes/User';
import { IUser } from '@myTypes/User';
import { IAPIResult } from '@myTypes/Common';
import { newIssuedToken } from '@controllers/authController';

const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.green};
  overflow: hidden;
`;

// 로그인은 했지만 새로고침 token && !auth.isLoggedin
// 로그인한 상태인데 token이 만료 token && auth.isLoggedin && isJwtExpired(token)
const LoadPage: React.FC = () => {
  const [auth, setAuth] = useRecoilState<IAuthInfo>(authState);
  const routeHistory = useHistoryRouter();
  const location = useLocation();

  useEffect(() => {
    const check = async () => {
      // access token을 재발급
      const continueMember = await newIssuedToken();

      if (!continueMember) {
        setAuth({
          ...auth,
          isLoggedin: false,
          oauth_email: '',
          address: '',
          image: '',
        });
        routeHistory('/map/signin');
      }

      if (auth.isLoggedin) {
        //access token만 재발급하는 경우
        routeHistory(location.state.pathname);
      } else {
        // user 정보도 재발급하는 경우
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('token', sessionStorage.getItem('jwt') as string);
        const userInfoResponse = await fetch(
          `${process.env.REACT_APP_API_URL as string}/api/auth/info`,
          {
            method: 'GET',
            headers: requestHeaders,
          },
        );
        const userInfo: IAPIResult<IUser | Record<string, never>> =
          await userInfoResponse.json();
        setAuth({
          ...auth,
          isLoggedin: true,
          oauth_email: userInfo.result.oauth_email,
          address: userInfo.result.address,
          image: userInfo.result.image,
        });

        routeHistory(location.state.pathname);
      }
    };

    check();
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
