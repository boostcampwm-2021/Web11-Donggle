import React, { useState } from 'react';

import AdressModal from '@components/AddressModal/index';

const SignUpModal: React.FC = () => {
  const a = () => {
    return console.log('회원가입');
  };
  return (
    <AdressModal title="" onSubmitHandler={a} onCancelHandler={a}></AdressModal>
  );
};
