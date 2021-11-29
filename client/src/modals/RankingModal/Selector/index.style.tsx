import styled from 'styled-components';
import React from 'react';

const DropdownWrapper = styled.div`
  position: absolute;
  z-index: 4000;
  left: 0;
  width: 100%;
  max-height: 240px;

  background-color: ${({ theme }) => theme?.colors?.white ?? '#FFFFFF'};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors?.green ?? '#33AB74'};

  > *:first-child {
    background-color: ${({ theme }) => theme.colors?.lightgrey ?? '#C4C4C4'};
  }

  > *:not(:last-child) {
    ::after {
      position: relative;
      top: 8px;
      display: block;
      margin: 0 12px;
      content: '';
      border-bottom: 1px solid #c5c5c5;
    }
  }

  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 4px;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme?.colors?.ashgrey ?? '#666362'};
    border-radius: 4px;
  }
`;

const DropdownItem = styled.div`
  padding: 8px 0;
  cursor: pointer;
  text-align: center;
  :hover {
    background-color: ${({ theme }) => theme.colors?.grey ?? '#E5E5E5'};
  }
`;

const SelectBarDiv = styled.div`
  min-width: 160px;
  padding: 8px 10px;
  color: ${({ theme }) => theme?.colors?.white ?? '#FFFFFF'};
  background-color: ${({ theme }) => theme?.colors?.green ?? '#33AB74'};
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  > *:not(:last-child) {
    margin-right: 8px;
  }
`;

interface ISelectBarProps {
  onClick?: React.MouseEventHandler;
}

const SelectBar: React.FC<ISelectBarProps> = ({ children, onClick }) => {
  return (
    <SelectBarDiv onClick={onClick}>
      <div style={{ flex: '1', textAlign: 'center' }}>
        <span>{children}</span>
      </div>
      <span>▼</span>
    </SelectBarDiv>
  );
};

export { DropdownWrapper, DropdownItem, SelectBar };
