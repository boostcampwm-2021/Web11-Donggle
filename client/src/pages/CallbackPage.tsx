import React, { useEffect } from 'react';
import styled from 'styled-components';
import qs from 'qs';

import LoadAnimation from '@components/Callback/index';

const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #191940;
  overflow: hidden;
`;

const CallbackPage: React.FC = () => {
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
        const { login, avatar_url } = await userInfoResponse.json();
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
