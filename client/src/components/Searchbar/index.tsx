import {
  SearchbarWrapper,
  SearchbarInput,
  SearchbarButton,
  SearchImg,
  DropdownWrapper,
  DropdownItem,
} from '@components/Searchbar/index.style';
import { spreadDropdown } from '@controllers/searchbarController';

import React, { useEffect, useState, useRef } from 'react';

interface SearchbarProps {
  map: kakao.maps.Map | null;
}

const Searchbar: React.FC<SearchbarProps> = ({ map }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const isSpread = useRef(false);

  const places = useRef<kakao.maps.services.Places | null>(null);

  useEffect(() => {
    if (map !== null) {
      places.current = new kakao.maps.services.Places(map);
    }
  }, [map]);

  useEffect(() => {
    if (places.current !== null) {
      spreadDropdown(places.current, input, isSpread.current, setResults);
    }
  }, [input]);

  return (
    <>
      <SearchbarWrapper>
        <SearchbarInput onChange={(e) => setInput(e.target.value)} />
        <SearchbarButton>
          <SearchImg />
        </SearchbarButton>
      </SearchbarWrapper>
      <DropdownWrapper>
        {results.length > 0 &&
          results.map((result, i) => (
            <DropdownItem key={i}>{result}</DropdownItem>
          ))}
      </DropdownWrapper>
    </>
  );
};

export default Searchbar;
