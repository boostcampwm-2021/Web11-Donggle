import React, { useEffect } from 'react';
import { Route, RouterProps } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from '@stores/atoms';

import { IAPIResult } from '@myTypes/Common';
import { IUser } from '@myTypes/User';
import { getOptions } from '@utils/common';

const PublicRoute: React.FC<RouterProps> = ({
  component: Component,
  ...rest
}) => {
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const checkUserSignIn = async () => {
      const userInfoRes = await fetch(
        `${process.env.REACT_APP_API_URL as string}/api/auth/info`,
        getOptions('GET', undefined, 'same-origin'),
      );
      const userInfo: IAPIResult<IUser | Record<string, never>> =
        await userInfoRes.json();

      if (userInfoRes.status !== 200) {
        return;
      } else {
        setAuth({
          isLoggedin: true,
          oauthEmail: userInfo.result.oauthEmail,
          address: userInfo.result.address,
          image: userInfo.result.image,
        });
      }
    };

    if (!auth.isLoggedin) {
      console.log(' 요청보내기 publicRoute 효과');
      checkUserSignIn();
    }

    console.log('useEffect publicRoute');
  }, []);

  return <Route {...rest} render={() => <Component />} />;
};

export default PublicRoute;
