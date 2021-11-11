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
import Modal from '@components/modal';

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const Profile: React.FC = withRouter(({ history, location }) => {
  const [auth] = useRecoilState(authState);

  const [isModal, setIsModal] = useState(false);

  const toggleModal = () => {
    if (!isModal) {
      history.push(location.pathname);
    }
    setIsModal((prev) => !prev);
  };

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
      <AddressWrapper onClick={() => toggleModal()}>
        {auth.address}
      </AddressWrapper>
      {isModal && <Modal>엥</Modal>}
    </>
  );
});

export default Profile;
