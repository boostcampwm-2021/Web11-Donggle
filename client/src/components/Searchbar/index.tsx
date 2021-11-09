import {
  SearchbarWrapper,
  SearchbarInput,
  SearchbarButton,
  SearchImg,
} from '@components/Searchbar/index.style';

import React from 'react';

const Searchbar: React.FC = (props) => {
  return (
    <SearchbarWrapper>
      <SearchbarInput />
      <SearchbarButton>
        <SearchImg />
      </SearchbarButton>
    </SearchbarWrapper>
  );
};

export default Searchbar;
