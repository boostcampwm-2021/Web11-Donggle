import { isJwtExpired } from 'jwt-check-expiration';

import { IAPIResult } from '@myTypes/Common';
import { IToken } from '@myTypes/User';

/*
2021-11-20
문혜현
token이 잘못되었거나 access와 refresh token이 만료된 경우로 모든 경우에 대해서 sessionStorage를 비우고 로그인 페이지로 이동시킴
*/
const checkExpired = async (routeHistory) => {
  const token = sessionStorage.getItem('jwt');

  if (!isJwtExpired(token)) {
    return;
  }
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('token', sessionStorage.getItem('jwt') as string);
  requestHeaders.set(
    'refreshToken',
    sessionStorage.getItem('refreshToken') as string,
  );

  const newTokenRes = await fetch(
    `${process.env.REACT_APP_API_URL as string}/api/auth/refresh`,
    {
      method: 'GET',
      headers: requestHeaders,
    },
  );

  const newToken: IAPIResult<IToken | Record<string, never>> =
    await newTokenRes.json();

  if (newTokenRes.status !== 200) {
    alert(newToken.message);
    /*
    2021-11-20
    문혜현
    token이 잘못되었거나 access와 refresh token이 만료된 경우로 모든 경우에 대해서 sessionStorage를 비우고 로그인 페이지로 이동시킴
    */
    sessionStorage.clear();
    routeHistory('/map/signin');
  } else {
    sessionStorage.setItem('jwt', newToken.result.jwtToken);
  }
};

export { checkExpired };
