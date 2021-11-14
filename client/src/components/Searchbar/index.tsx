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
  onClickHandler: (mapInfo: MapInfo) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onClickHandler }) => {
  const [input, setInput] = useState('');

  const [results, setResults] = useState<MapInfo[]>([]);
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
              onClick={(e) => {
                onClickHandler(result);
                setResults([]);
                if (inputTagRef.current !== null) {
                  inputTagRef.current.value = '';
                }
              }}
            >
              {result.address}
            </DropdownItem>
          ))}
      </DropdownWrapper>
    </>
  );
};

export default Searchbar;
