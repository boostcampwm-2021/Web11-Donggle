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
import { uploadImage, deleteImage } from '@controllers/profileController';
import useHistoryRouter from '@hooks/useHistoryRouter';

import React, { ChangeEvent, useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';

const Profile: React.FC = () => {
  const routeHistory = useHistoryRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const onImgChange = useCallback(
    async (e: ChangeEvent) => {
      await uploadImage(e, auth, setAuth);
      if (hiddenInputRef.current) hiddenInputRef.current.value = '';
    },
    [auth, setAuth],
  );

  const inputClickPasser = useCallback(() => {
    hiddenInputRef.current?.click();
  }, []);

  const onDeleteClick = useCallback(() => {
    deleteImage(auth, setAuth);
    if (hiddenInputRef.current) hiddenInputRef.current.value = '';
  }, [auth, setAuth]);

  const onUpdateAddressClick = useCallback(() => {
    routeHistory('/profile/update-address');
  }, [routeHistory]);

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
            alt="프로필사진"
          />
          <div>
            <input
              type="file"
              name="file"
              accept="image/jpeg, image/png"
              style={{ display: 'none' }}
              onChange={onImgChange}
              ref={hiddenInputRef}
            />
            <ImageUploadButton onClick={inputClickPasser}>
              이미지 업로드
            </ImageUploadButton>
          </div>
          <ImageRemoveButton onClick={onDeleteClick}>
            이미지 제거
          </ImageRemoveButton>
        </ImageWrapper>
        <OauthnameWrapper>{auth.oauthEmail.split('_')[0]}</OauthnameWrapper>
        <UsernameWrapper>{auth.oauthEmail.split('_')[1]}</UsernameWrapper>
      </ImageUsernameWrapper>
      <AddressWrapper onClick={onUpdateAddressClick}>
        {auth.address}
      </AddressWrapper>
    </>
  );
};

export default React.memo(Profile);
