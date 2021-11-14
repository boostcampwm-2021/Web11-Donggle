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
import Searchbar from '@components/Searchbar/index';

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
    formData.append('file', image);
    formData.append('oauth_email', auth.oauth_email);
    formData.append('image', auth.image);
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
      image: result.image,
    }));
  };

  const deleteImage = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/profile-image?username=${
        auth.oauth_email
      }&imageURL=${encodeURIComponent(auth.image)}`,
      {
        method: 'DELETE',
      },
    );
    const result = await response.json();
    setAuth((prev) => ({ ...prev, image: result.image }));
  };

  const updateAddress = async (mapInfo: MapInfo) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/profile-address`,
      {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          prevAddress: auth.address,
          newAddress: mapInfo.address,
        }),
      },
    );
    const result = await response.json();
    console.log(result);
    setAuth((prev) => ({ ...prev, address: result.address }));
  };

  return (
    <>
      <ImageUsernameWrapper>
        <ImageWrapper>
          <UserImage
            src={
              auth.image.length > 0
                ? auth.image
                : process.env.REACT_APP_IMAGE_DEFAULT_USER
            }
          />
          <div>
            <input
              type="file"
              name="file"
              accept="image/jpeg, image/png"
              style={{ display: 'none' }}
              onChange={uploadImage}
              ref={hiddenInputRef}
            />
            <ImageUploadButton onClick={inputClickPasser}>
              이미지 업로드
            </ImageUploadButton>
          </div>
          <ImageRemoveButton onClick={deleteImage}>
            이미지 제거
          </ImageRemoveButton>
        </ImageWrapper>
        <UsernameWrapper>{auth.oauth_email}</UsernameWrapper>
      </ImageUsernameWrapper>
      <AddressWrapper onClick={() => toggleModal()}>
        {auth.address}
      </AddressWrapper>
      {isModal && (
        <Modal>
          <Searchbar onClickHandler={updateAddress} />
        </Modal>
      )}
    </>
  );
});

export default Profile;
