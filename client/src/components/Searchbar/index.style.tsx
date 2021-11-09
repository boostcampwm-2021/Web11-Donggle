import styled from 'styled-components';
import search from '@assets/icons/search.svg';

const SearchbarWrapper = styled.div`
  position: relative;
  top: 20px;
  left: 20px;
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
  cursor: pointer;
`;

const SearchImg = styled.img`
  width: 80%;
  height: 80%;
`;
SearchImg.defaultProps = { src: search };

export { SearchbarWrapper, SearchbarInput, SearchbarButton, SearchImg };
