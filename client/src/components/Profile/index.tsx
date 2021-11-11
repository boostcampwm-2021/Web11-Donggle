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

import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const Profile: React.FC = withRouter(({ history, location }) => {
  const [auth, setAuth] = useRecoilState(authState);

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const [isModal, setIsModal] = useState(false);

  const toggleModal = () => {
    if (!isModal) {
      history.push(`${location.pathname}/profile/update-address`);
    }
    setIsModal((prev) => !prev);
  };

  const inputClickPasser = () => {
    if (hiddenInputRef.current !== null) {
      hiddenInputRef.current.click();
    }
  };

  const uploadImage = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    formData.append('username', auth.username);
    formData.append('imageURL', auth.imageURL);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/profile-image`,
      {
        method: 'PATCH',
        body: formData,
      },
    );
    const result = await response.json();
    setAuth((prev) => ({
      ...prev,
      imageURL: result.imageURL,
    }));
  };

  return (
    <>
      <ImageUsernameWrapper>
        <ImageWrapper>
          <UserImage src={auth.imageURL} />
          <div>
            <input
              type="file"
              name="image"
              style={{ display: 'none' }}
              onChange={uploadImage}
              ref={hiddenInputRef}
            />
            <ImageUploadButton onClick={inputClickPasser}>
              이미지 업로드
            </ImageUploadButton>
          </div>
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
