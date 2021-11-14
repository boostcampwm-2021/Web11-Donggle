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
  setAuth((prev) => ({
    ...prev,
    image: result.image,
  }));
};

const deleteImage = async (auth, setAuth) => {
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

const updateAddress = (auth, setAuth) => async (mapInfo: MapInfo) => {
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
  setAuth((prev) => ({ ...prev, address: result.address }));
};

export { uploadImage, deleteImage, updateAddress };
