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
import { IMapInfo } from '@myTypes/Map';

interface SearchbarProps {
  onClickHandler: (mapInfo: IMapInfo) => void | Promise<void>;
  valueState?: string;
  onlyDong?: boolean;
}

const Searchbar: React.FC<SearchbarProps> = ({
  onClickHandler,
  valueState,
  onlyDong = false,
}) => {
  const [input, setInput] = useState('');

  const [results, setResults] = useState<IMapInfo[]>([]);
  const isSpread = useRef(false);
  const inputTagRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    spreadDropdown(input, isSpread.current, setResults, onlyDong);
  }, [input]);

  useEffect(() => {
    if (inputTagRef.current !== null && valueState) {
      inputTagRef.current.value = valueState;
    }
  }, [valueState]);

  return (
    <div>
      <SearchbarWrapper>
        <SearchbarInput
          onChange={(e) => setInput(e.target.value)}
          ref={inputTagRef}
        />
        <SearchbarButton>
          <SearchImg />
        </SearchbarButton>
      </SearchbarWrapper>
      {results.length > 0 && (
        <DropdownWrapper>
          {results.map((result, i) => (
            <DropdownItem
              key={i}
              onClick={(e) => {
                onClickHandler(result);
                setResults([]);
                if (inputTagRef.current !== null && !valueState) {
                  inputTagRef.current.value = '';
                }
              }}
            >
              {result.address}
            </DropdownItem>
          ))}
        </DropdownWrapper>
      )}
    </div>
  );
};

export default Searchbar;
