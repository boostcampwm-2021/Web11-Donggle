import {
  SearchbarWrapper,
  SearchbarInput,
  SearchbarButton,
  SearchImg,
  DropdownWrapper,
  DropdownItem,
} from '@components/Searchbar/index.style';
import { spreadDropdown } from '@controllers/searchbarController';
import { IMapInfo } from '@myTypes/Map';
import { getDebouncedFunction } from '@utils/common';

import React, { useEffect, useState, useRef, useCallback } from 'react';

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
  const input = useRef('');

  const [results, setResults] = useState<IMapInfo[]>([]);
  const isSpread = useRef(false);
  const inputTagRef = useRef<HTMLInputElement>(null);
  const dropdownTagRef = useRef<HTMLDivElement>(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [spreadFlag, setSpreadFlag] = useState(new Date());

  const debouncedSpreadDropdown = useCallback(
    getDebouncedFunction(
      () =>
        spreadDropdown(input.current, isSpread.current, setResults, onlyDong),
      500,
    ),
    [],
  );

  const getTop = (element: HTMLDivElement) =>
    element.getBoundingClientRect().top;

  useEffect(() => {
    debouncedSpreadDropdown();
  }, [spreadFlag]);

  useEffect(() => {
    if (inputTagRef.current !== null && valueState) {
      inputTagRef.current.value = valueState;
    }
  }, [valueState]);

  useEffect(() => {
    if (dropdownTagRef.current !== null) {
      setDropdownTop(getTop(dropdownTagRef.current));
    }
  }, [dropdownTagRef.current]);

  return (
    <div style={{ position: 'relative' }}>
      <SearchbarWrapper>
        <SearchbarInput
          onChange={(e) => {
            input.current = e.target.value;
            setSpreadFlag(new Date());
          }}
          ref={inputTagRef}
        />
        <SearchbarButton>
          <SearchImg />
        </SearchbarButton>
      </SearchbarWrapper>
      {results.length > 0 && (
        <DropdownWrapper ref={dropdownTagRef} top={dropdownTop}>
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

export default React.memo(Searchbar);
