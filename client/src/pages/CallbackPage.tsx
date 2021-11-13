import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import qs from 'qs';

import { authState } from '@stores/atoms';
import LoadAnimation from '@components/Callback/index';
import { NonRelativeModuleNameResolutionCache } from 'typescript';

const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #191940;
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

const CallbackPage: React.FC = () => {
  const [auth, setAuth] = useRecoilState<AuthInfo>(authState);

  useEffect(() => {
    const getToken = async () => {
      const { code } = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
      });

      //backend에서 access_token이랑 github api 날린 다음에 github_id를 보냄
      //process.env.REACT_APP_API_URL +
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
        const userInfo: string | UserInfo = await userInfoResponse.json(); //{oauthEmail, jwtToken}
        if (typeof userInfo == 'string') {
          //회원가입 페이지로 routing
          console.log('회원가입 페이지로 라우팅');
        } else {
          // sessionstorage에 jwt토큰 값을 저장 && recoil update && 메인페이지로 routing
          sessionStorage.setItem('jwt', userInfo.jwtToken);
          setAuth({
            isLoggedin: true,
            oauth_email: userInfo.oauthEmail,
            address: userInfo.address,
            image: userInfo.image,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
  }, []);
  return (
    <Body>
      <LoadAnimation />
    </Body>
  );
};

export default CallbackPage;
