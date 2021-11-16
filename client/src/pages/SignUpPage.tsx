import AddressModal from '@components/AddressModal/index';

import React from 'react';

const SignUpPage: React.FC = () => {
  return (
    <AddressModal
      title="타이틀"
      onSubmitHandler={() => {
        console.log('확인 버튼');
      }}
      onCancelHandler={() => {
        console.log('취소 버튼');
      }}
    />
  );
};

export default SignUpPage;
