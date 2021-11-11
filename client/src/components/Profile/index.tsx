import {
  ImageUsernameWrapper,
  ImageWrapper,
  UsernameWrapper,
  AddressWrapper,
} from '@components/Profile/index.style';
import { authState } from '@stores/atoms';

import React from 'react';
import { useRecoilState } from 'recoil';

const Profile: React.FC = () => {
  const [auth] = useRecoilState(authState);

  return (
    <>
      <ImageUsernameWrapper>
        <ImageWrapper />
        <UsernameWrapper>{auth.username}</UsernameWrapper>
      </ImageUsernameWrapper>
      <AddressWrapper />
    </>
  );
};

export default Profile;
