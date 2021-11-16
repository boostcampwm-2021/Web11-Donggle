import marker from '@assets/icons/marker.svg';

import styled from 'styled-components';

const MapWrapper = styled.div`
  width: 100%;
  height: calc(100% - 140px);
`;

const TestDiv = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline;
  z-index: 10;
  cursor: pointer;
  background-color: white;
`;

const CenterMarker = styled.img`
  position: fixed;
  left: calc(50% - 25px);
  top: calc(51%);
  width: 50px;
  height: 50px;
  z-index: 2000;
  user-select: none;
  pointer-events: none;
`;
CenterMarker.defaultProps = { src: marker };

const SearchbarWrapper = styled.div`
  position: relative;
  top: 20px;
  left: 20px;
`;

export default MapWrapper;
export { TestDiv, CenterMarker, SearchbarWrapper };
