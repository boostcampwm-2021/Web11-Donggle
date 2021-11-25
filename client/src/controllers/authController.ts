import { IAPIResult } from '@myTypes/Common';
import { IToken } from '@myTypes/User';

/*
2021-11-24
문혜현
로그인은 했지만 새로고침 token && !auth.isLoggedin
로그인한 상태인데 token이 만료 token && auth.isLoggedin && isJwtExpired(token)
위의 경우를 가정함
token이 잘못되었거나 access와 refresh token이 만료된 경우로 모든 경우에 대해서 sessionStorage를 비우고 로그인 페이지로 이동시킴
*/
const newIssuedToken = async () => {
  const newTokenRes = await fetch(
    `${process.env.REACT_APP_API_URL as string}/api/auth/refresh`,
    {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
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
    return false;
  } else {
    const now = new Date();
    const time = now.getTime();
    sessionStorage.setItem('timer', time.toString());
    return true;
  }
};

export { newIssuedToken };
