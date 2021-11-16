import {
  ImageUsernameWrapper,
  ImageWrapper,
  UserImage,
  ImageUploadButton,
  ImageRemoveButton,
  OauthnameWrapper,
  UsernameWrapper,
  AddressWrapper,
} from '@components/Profile/index.style';
import { authState } from '@stores/atoms';
import AddressModal from '@components/AddressModal/index';
import {
  uploadImage,
  deleteImage,
  updateAddress,
} from '@controllers/profileController';

import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const Profile: React.FC = withRouter(({ history, location }) => {
  const [auth, setAuth] = useRecoilState(authState);

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const [isModal, setIsModal] = useState(false);

  const toggleModal = () => {
    if (!isModal) {
      history.push(`${location.pathname}/update-address`);
    }
    setIsModal((prev) => !prev);
  };

  const inputClickPasser = () => {
    if (hiddenInputRef.current !== null) {
      hiddenInputRef.current.click();
    }
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
              onChange={(e) => uploadImage(e, auth, setAuth)}
              ref={hiddenInputRef}
            />
            <ImageUploadButton onClick={inputClickPasser}>
              이미지 업로드
            </ImageUploadButton>
          </div>
          <ImageRemoveButton onClick={() => deleteImage(auth, setAuth)}>
            이미지 제거
          </ImageRemoveButton>
        </ImageWrapper>
        <OauthnameWrapper>{auth.oauth_email.split('_')[0]}</OauthnameWrapper>
        <UsernameWrapper>{auth.oauth_email.split('_')[1]}</UsernameWrapper>
      </ImageUsernameWrapper>
      <AddressWrapper onClick={toggleModal}>{auth.address}</AddressWrapper>
      {isModal && (
        <AddressModal
          title="우리 동네를 입력해주세요!"
          onSubmitHandler={() => {
            console.log('?');
          }}
          onCancelHandler={() => {
            console.log('?');
          }}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
});

export default Profile;
