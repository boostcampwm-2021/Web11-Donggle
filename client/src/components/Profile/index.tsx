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
import {
  uploadImage,
  deleteImage,
  updateAddress,
} from '@controllers/profileController';
import useHistoryRouter from '@hooks/useHistoryRouter';

import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';

const Profile: React.FC = () => {
  const routeHistory = useHistoryRouter();
  const location = useLocation();

  const [auth, setAuth] = useRecoilState(authState);

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

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
      <AddressWrapper onClick={() => routeHistory('profile/update-address')}>
        {auth.address}
      </AddressWrapper>
    </>
  );
};

export default Profile;
