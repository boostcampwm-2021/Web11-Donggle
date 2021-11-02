import React, { FC } from 'react';
import LoginButton, { ColumnFlex } from './index.styled';
import { ReactComponent as GoogleIcon } from '@assets/icons/google.svg';
import { ReactComponent as NaverIcon } from '@assets/icons/naver.svg';
import { ReactComponent as FacebookIcon } from '@assets/icons/facebook.svg';

const LoginPlate: FC = () => {
  return (
    <ColumnFlex>
      <span style={{ fontWeight: 'bold', height: '40px' }}>
        내가 사는 동네 평점을 남겨보세요
      </span>
      <LoginButton
        IconComponent={GoogleIcon}
        text="Google 로그인"
        color="#000000"
        theme="#ffffff"
      ></LoginButton>
      <LoginButton
        IconComponent={NaverIcon}
        text="네이버 로그인"
        color="#ffffff"
        theme="#03c75a"
      ></LoginButton>
      <LoginButton
        IconComponent={FacebookIcon}
        text="Facebook 로그인"
        color="#ffffff"
        theme="#3c5a99"
      ></LoginButton>
    </ColumnFlex>
  );
};

export default LoginPlate;
