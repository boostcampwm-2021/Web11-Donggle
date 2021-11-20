import { isJwtExpired } from 'jwt-check-expiration';
import { IToken } from '@myTypes/User';

// 로그인이 이미 되어 있어서 sessionstorage에 토큰이 있다고 가정함
const checkExpired = async () => {
  const token = sessionStorage.getItem('jwt');
  if (!isJwtExpired(token)) {
    return;
  }
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('token', sessionStorage.getItem('jwt') as string);
  requestHeaders.set('token', sessionStorage.getItem('refreshToken') as string);

  const newTokenRes = await fetch(
    `${process.env.REACT_APP_API_URL as string}/api/auth/refresh`,
    {
      method: 'GET',
      headers: requestHeaders,
    },
  );

  const newToken: IToken = await newTokenRes.json();

  sessionStorage.setItem('jwt', newToken.jwtToken);
};
