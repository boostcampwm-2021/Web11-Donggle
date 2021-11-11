import {
  ImageUsernameWrapper,
  ImageWrapper,
  UserImage,
  ImageUploadButton,
  ImageRemoveButton,
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
        <ImageWrapper>
          <UserImage src={auth.imageURL} />
          <ImageUploadButton>이미지 업로드</ImageUploadButton>
          <ImageRemoveButton>이미지 제거</ImageRemoveButton>
        </ImageWrapper>
        <UsernameWrapper>{auth.username}</UsernameWrapper>
      </ImageUsernameWrapper>
      <AddressWrapper>{auth.address}</AddressWrapper>
    </>
  );
};

export default Profile;
