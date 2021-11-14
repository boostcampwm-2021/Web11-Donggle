import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { authState } from '@stores/atoms';
import SearchBar from '@components/Searchbar/index';
import Modal from '@components/modal';
import useHistoryRouter from '@utils/useRouter';
import { SignUpTitle, ButtonWrapper, SubmitButton } from './index.style';

interface AuthInfo {
  isLoggedin: boolean;
  oauth_email: string;
  address: string;
  image: string;
}

interface ErrMsg {
  err: string;
}

const SignUpModal: React.FC = () => {
  const [auth, setAuth] = useRecoilState<AuthInfo>(authState);
  const [history, routeHistory] = useHistoryRouter();

  const onSubmitClick = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/address`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          oauthEmail: auth.oauth_email,
          address: '전라북도 전주시 완산구 서신동',
          image: auth.image,
        }),
      },
    );

    if (response.status != 200) {
      const errMsg: ErrMsg = await response.json();
      alert(errMsg.err);
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
  */

  useEffect(() => {
    if (auth.address) {
      routeHistory('/', {});
    }
  }, [auth, routeHistory]);

  return (
    <Modal>
      <SignUpTitle>
        회원가입을 위해서 우리 동네 정보를 입력해주세요!
      </SignInTitle>
      <SearchBar
        onClickHandler={(temp: MapInfo) => {
          console.log('예비 코드');
        }}
      />
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

export default SignUpModal;
