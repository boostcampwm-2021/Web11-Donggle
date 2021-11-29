import search from '@assets/icons/search.svg';

import React from 'react';
import isEqual from 'react-fast-compare';
import styled from 'styled-components';

const SearchbarWrapper = React.memo(
  styled.div`
    position: relative;
    width: 400px;
    height: 60px;
    padding-left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border: solid 2px #33ab74;
    border-radius: 20px;
    z-index: 1000;
  `,
  isEqual,
);

const SearchbarInput = React.memo(styled.input`
  width: 300px;
  height: 50px;
  outline: none;
  border: none;
`);

const SearchbarButton = React.memo(
  styled.button`
    width: 60px;
    height: 60px;
    border-radius: 20px;
    border: none;
    background-color: #33ab74;
  `,
  isEqual,
);

const LensImg = styled.img`
  width: 80%;
  height: 80%;
`;
LensImg.defaultProps = { src: search };
const SearchImg = React.memo(LensImg);

const DropdownWrapper = React.memo(styled.div<{ top: number }>`
  position: absolute;
  left: 20px;
  width: 310px;
  height: auto;
  background: #fff;
  border-radius: 10px;
  border: solid 1px #c5c5c5;
  z-index: 1000;
  max-height: calc(100vh - ${(props) => props.top}px - 20px);
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background: #c5c5c5;
    border-radius: 999px;
  }
  > *:not(:last-child) {
    ::after {
      margin-top: 20px;
      display: block;
      top: 50px;
      content: '';
      width: 280px;
      border-bottom: solid 1px #c5c5c5;
    }
  }
`);

const DropdownItem = styled.div`
  position: relative;
  width: 300px;
  height: 50px;
  padding: 10px 10px;
  background: #fff;
  z-index: 1000;
  cursor: pointer;
  :hover {
    background: #c5c5c5;
  }
`;

export {
  SearchbarWrapper,
  SearchbarInput,
  SearchbarButton,
  SearchImg,
  DropdownWrapper,
  DropdownItem,
};
