import { DropdownWrapper, DropdownItem, SelectBar } from './index.style';

import React, { useCallback, useEffect, useState } from 'react';

interface IProps {
  labels: string[];
  onSelected: (idx: number) => void;
  disabled: boolean;
}

const Selector: React.FC<IProps> = ({ labels, onSelected, disabled }) => {
  const [selected, setSelected] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const closeDropdown = useCallback(() => setDropdownOpen(false), []);
  const toggleDropdown = useCallback(
    () => setDropdownOpen((prev) => !prev),
    [],
  );

  useEffect(() => {
    setSelected(0);
    setDropdownOpen(false);
  }, [disabled]);

  return (
    <div style={{ position: 'relative' }}>
      <SelectBar onClick={disabled ? undefined : toggleDropdown}>
        {labels[selected]}
      </SelectBar>
      {dropdownOpen && (
        <DropdownWrapper>
          {labels.map((label, idx) => (
            <DropdownItem
              key={label}
              onClick={() => {
                setSelected(idx);
                onSelected(idx);
                closeDropdown();
              }}
            >
              {label}
            </DropdownItem>
          ))}
        </DropdownWrapper>
      )}
    </div>
  );
};

export default Selector;
