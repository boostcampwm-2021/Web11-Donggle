import Modal from '@components/Common/Modal/index';
import { ReactComponent as GoogleIcon } from '@assets/icons/google.svg';
import { ReactComponent as NaverIcon } from '@assets/icons/naver.svg';
import { ReactComponent as FacebookIcon } from '@assets/icons/facebook.svg';
import {
  ColumnFlex,
  FlexButton,
  StretchingDiv,
  CenteredSpan,
} from './index.style';

import React from 'react';

type SignInButtonProps = {
  IconComponent: React.FC;
  text: string;
  color: string;
  bgColor: string;
  onClick?: () => void;
};

const SignInButton: React.FC<SignInButtonProps> = (props) => {
  const { IconComponent, text, color, bgColor, onClick } = props;

  return (
    <FlexButton bgColor={bgColor} color={color} onClick={onClick}>
      <IconComponent />
      <StretchingDiv>
        <span>{text}</span>
      </StretchingDiv>
    </FlexButton>
  );
};

const signInGithub = () => {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const redirect_url = process.env.REACT_APP_REDIRECT_URL;
  const signInUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=read:user&redirect_uri=${redirect_url}`;
  window.location.href = signInUrl;
};

const SignInModal: React.FC = () => {
  return (
    <Modal>
      <ColumnFlex>
        <CenteredSpan>내가 사는 동네 평점을 남겨보세요</CenteredSpan>
        <SignInButton
          IconComponent={GoogleIcon}
          text="Google 로그인"
          color="#000000"
          bgColor="#ffffff"
          onClick={signInGithub}
        ></SignInButton>
        <SignInButton
          IconComponent={NaverIcon}
          text="네이버 로그인"
          color="#ffffff"
          bgColor="#03c75a"
        ></SignInButton>
        <SignInButton
          IconComponent={FacebookIcon}
          text="Facebook 로그인"
          color="#ffffff"
          bgColor="#3c5a99"
        ></SignInButton>
      </ColumnFlex>
    </Modal>
  );
};

export default SignInModal;
