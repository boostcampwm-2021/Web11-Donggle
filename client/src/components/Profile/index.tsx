import {
  ImageUsernameWrapper,
  ImageWrapper,
  UsernameWrapper,
  AddressWrapper,
} from '@components/Profile/index.style';

import React from 'react';

const Profile: React.FC = () => (
  <>
    <ImageUsernameWrapper>
      <ImageWrapper />
      <UsernameWrapper />
    </ImageUsernameWrapper>

    <AddressWrapper className="asdf" />
  </>
);

export default Profile;
