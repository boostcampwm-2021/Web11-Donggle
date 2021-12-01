import { ChangeEvent } from 'react';
import { SetterOrUpdater } from 'recoil';
import { IMapInfo } from '@myTypes/Map';
import { IAuthInfo } from '@myTypes/User';
import { showSnackbar, getOptions } from '@utils/common';

const uploadImage = async (
  e: ChangeEvent,
  auth: IAuthInfo,
  setAuth: SetterOrUpdater<IAuthInfo>,
): Promise<void> => {
  showSnackbar('이미지 크기에 따라 시간이 걸릴수 있어요.');
  const image = (e.target as HTMLInputElement).files![0];
  const formData = new FormData();
  formData.append('file', image);
  formData.append('oauth_email', auth.oauthEmail);
  formData.append('image', auth.image);
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/user/profile-image`,
    getOptions('PATCH', formData, 'same-origin'),
  );
  const result = await response.json();
  if (response.status === 200) {
    setAuth((prev) => ({
      ...prev,
      image: result.result,
    }));
  } else {
    showSnackbar('이미지 업로딩에 실패했어요!', true);
  }
};

const deleteImage = async (
  auth: IAuthInfo,
  setAuth: SetterOrUpdater<IAuthInfo>,
): Promise<void> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/user/profile-image?oauth_email=${
      auth.oauthEmail
    }&image=${encodeURIComponent(auth.image)}`,
    getOptions('DELETE', undefined),
  );
  const result = await response.json();
  if (response.status === 200) {
    setAuth((prev) => ({
      ...prev,
      image: result.result,
    }));
  } else {
    showSnackbar(result.message, true);
  }
};

const updateAddress =
  (auth: IAuthInfo, setAuth: SetterOrUpdater<IAuthInfo>) =>
  async (mapInfo: IMapInfo) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/profile-address`,
      {
        ...getOptions('PATCH', {
          oauth_email: auth.oauthEmail,
          address: mapInfo.address,
        }),
        headers: { 'Content-type': 'application/json' },
      },
    );
    const result = await response.json();
    if (response.status === 200) {
      setAuth((prev) => ({ ...prev, address: result.result }));
    } else {
      showSnackbar(result.message, true);
    }
  };

export { uploadImage, deleteImage, updateAddress };
