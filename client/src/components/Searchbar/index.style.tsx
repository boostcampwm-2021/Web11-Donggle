import styled from 'styled-components';
import search from '@assets/icons/search.svg';

const SearchbarWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 60px;
  padding-left: 20px;
  display: flex;Ç
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: solid 2px #33ab74;
  border-radius: 20px;
  z-index: 1000;
`;

const SearchbarInput = styled.input`
  width: 300px;
  height: 50px;
  outline: none;
  border: none;
`;

const SearchbarButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  border: none;
  background-color: #33ab74;
`;

const SearchImg = styled.img`
  width: 80%;
  height: 80%;
`;
SearchImg.defaultProps = { src: search };

const DropdownWrapper = styled.div`
  position: relative;
  left: 20px;
  width: 310px;
  height: auto;
  background: #fff;
  border-radius: 10px;
  border: solid 1px #c5c5c5;
  z-index: 1000;
  max-height: 600px;
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
`;

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
  ::after {
    margin-top: 20px;
    display: block;
    top: 50px;
    content: '';
    width: 280px;
    border-bottom: solid 1px #c5c5c5;
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
