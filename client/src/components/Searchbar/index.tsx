import {
  SearchbarWrapper,
  SearchbarInput,
  SearchbarButton,
  SearchImg,
  DropdownWrapper,
  DropdownItem,
} from '@components/Searchbar/index.style';
import {
  SimpleMap,
  spreadDropdown,
  moveTo,
} from '@controllers/searchbarController';

import React, { useEffect, useState, useRef } from 'react';

interface SearchbarProps {
  map: kakao.maps.Map | null;
}

const Searchbar: React.FC<SearchbarProps> = ({ map }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<SimpleMap[]>([]);
  const isSpread = useRef(false);

  const inputTagRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    spreadDropdown(input, isSpread.current, setResults);
  }, [input]);

  return (
    <>
      <SearchbarWrapper>
        <SearchbarInput
          onChange={(e) => setInput(e.target.value)}
          ref={inputTagRef}
        />
        <SearchbarButton>
          <SearchImg />
        </SearchbarButton>
      </SearchbarWrapper>
      <DropdownWrapper>
        {results.length > 0 &&
          results.map((result, i) => (
            <DropdownItem
              key={i}
              onClick={(e) =>
                moveTo(map, results[i], setResults, inputTagRef.current)
              }
            >
              {result.name}
            </DropdownItem>
          ))}
      </DropdownWrapper>
    </>
  );
};

export default Searchbar;
