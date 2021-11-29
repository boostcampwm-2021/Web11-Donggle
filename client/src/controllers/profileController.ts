import { IMapInfo } from '@myTypes/Map';
import { showSnackbar } from '@utils/common';

const uploadImage = async (e, auth, setAuth) => {
  showSnackbar('이미지 크기에 따라 시간이 걸릴수 있어요.');
  const image = e.target.files[0];
  const formData = new FormData();
  formData.append('file', image);
  formData.append('oauth_email', auth.oauthEmail);
  formData.append('image', auth.image);
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/user/profile-image`,
    {
      method: 'PATCH',
      body: formData,
    },
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

const deleteImage = async (auth, setAuth) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/user/profile-image?oauth_email=${
      auth.oauthEmail
    }&image=${encodeURIComponent(auth.image)}`,
    {
      method: 'DELETE',
    },
  );
  const result = await response.json();
  if (response.status === 200) {
    setAuth((prev) => ({
      ...prev,
      image: result.result,
    }));
  } else {
    console.error(result.message);
  }
};

const updateAddress = (auth, setAuth) => async (mapInfo: IMapInfo) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/user/profile-address`,
    {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        oauth_email: auth.oauthEmail,
        address: mapInfo.address,
      }),
    },
  );
  const result = await response.json();
  if (response.status === 200) {
    setAuth((prev) => ({ ...prev, address: result.result }));
  } else {
    console.error(result.message);
  }
};

export { uploadImage, deleteImage, updateAddress };
