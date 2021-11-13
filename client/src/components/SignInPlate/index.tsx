import React from 'react';

import SearchBar from '@components/Searchbar/signIn';
import Modal from '@components/modal';
import { SignInTitle, ButtonWrapper, SubmitButton } from './index.style';

const SignInPlate: React.FC = () => {
  return (
    <Modal>
      <SignInTitle>
        회원가입을 위해서 우리 동네 정보를 입력해주세요!
      </SignInTitle>
      <SearchBar />
      <ButtonWrapper>
        <SubmitButton cancel={false}>제출</SubmitButton>
        <SubmitButton cancel={true}>취소</SubmitButton>
      </ButtonWrapper>
    </Modal>
  );
};

export default SignInPlate;
