import React, { useEffect } from 'react';
import useHistoryRouter from '@hooks/useHistoryRouter';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import qs from 'qs';

import { authState } from '@stores/atoms';
import LoadAnimation from '@components/Loading/index';

const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.green};
  overflow: hidden;
`;

interface UserInfo {
  jwtToken: string;
  oauthEmail: string;
  address: string;
  image: string;
}

interface AuthInfo {
  isLoggedin: boolean;
  oauth_email: string;
  address: string;
  image: string;
}

const LoadingPage: React.FC = () => {
  const [auth, setAuth] = useRecoilState<AuthInfo>(authState);
  const [history, routeHistory] = useHistoryRouter();

  useEffect(() => {
    const getToken = async () => {
      const { code } = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
      });

      //backend에서 access_token이랑 github api 날린 다음에 github_id를 보냄
      try {
        const userInfoResponse = await fetch(
          `${process.env.REACT_APP_API_URL as string}/api/v1/auth`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          },
        );
        const userInfo: UserInfo = await userInfoResponse.json();
        if (!userInfo.jwtToken) {
          // 회원가입 페이지로 routing
          // 회원가입 주소를 제출할 때 db에 저장하기 위한 정보를 주기 위해서 recoil에 저장
          setAuth({
            ...auth,
            oauth_email: userInfo.oauthEmail,
            image: userInfo.image,
          });
          routeHistory('/signup', {});
        } else {
          // sessionstorage에 jwt토큰 값을 저장 && recoil update && 메인페이지로 routing
          sessionStorage.setItem('jwt', userInfo.jwtToken);
          setAuth({
            ...auth,
            isLoggedin: true,
            oauth_email: userInfo.oauthEmail,
            address: userInfo.address,
            image: userInfo.image,
          });
          routeHistory('/', {}); // mainpage로 이동
        }
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
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
