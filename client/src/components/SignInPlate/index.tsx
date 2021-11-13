import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { authState } from '@stores/atoms';
import SearchBar from '@components/Searchbar/signIn';
import Modal from '@components/modal';
import useHistoryRouter from '@utils/useRouter';
import { SignInTitle, ButtonWrapper, SubmitButton } from './index.style';

interface AuthInfo {
  isLoggedin: boolean;
  oauth_email: string;
  address: string;
  image: string;
}

const SignInPlate: React.FC = () => {
  const [auth, setAuth] = useRecoilState<AuthInfo>(authState);
  const [history, routeHistory] = useHistoryRouter();

  const onSubmitClick = async () => {
    const response = await fetch('/api/v1/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        oauthEmail: auth.oauth_email,
        address: '전주시 완산구 서신동',
        image: auth.image,
      }),
    });

    if (response.status != 200) {
      alert('올바른 주소로 다시 한 번 제출을 부탁드립니다.');
    } else {
      setAuth({
        ...auth,
        isLoggedin: true,
        address: '전주시 완산구 서신동',
      });
      routeHistory('/', {});
    }
  };

  const onCancelClick = () => {
    window.location.href = process.env.REACT_APP_MAIN_URL as string;
  };

  /* history가 이상하게 되어서 확인 필요
  const onCancelClickTest = () => {
    //recoil에 있는 값을 다 없애고, mainpage로 routing
    setAuth({
      ...auth,
      oauth_email: '',
      image: '123',
    });
  };

  useEffect(() => {
    if (auth.image == '123') {
      routeHistory('/', {});
    }
  }, [auth, routeHistory]);

  */
  return (
    <Modal>
      <SignInTitle>
        회원가입을 위해서 우리 동네 정보를 입력해주세요!
      </SignInTitle>
      <SearchBar />
      <ButtonWrapper>
        <SubmitButton cancel={false} onClick={onSubmitClick}>
          제출
        </SubmitButton>
        <SubmitButton cancel={true} onClick={onCancelClick}>
          취소
        </SubmitButton>
      </ButtonWrapper>
    </Modal>
  );
};

export default SignInPlate;
