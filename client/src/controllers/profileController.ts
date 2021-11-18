import { IMapInfo } from '@myTypes/Map';

const uploadImage = async (e, auth, setAuth) => {
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
  if (response.status === 200) {
    setAuth((prev) => ({
      ...prev,
      image: result.result,
    }));
  } else {
    console.error(result.message);
  }
};

const deleteImage = async (auth, setAuth) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/user/profile-image?oauth_email=${
      auth.oauth_email
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
        oauth_email: auth.oauth_email,
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
