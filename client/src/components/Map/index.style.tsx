import styled from 'styled-components';

const MapWrapper = styled.div`
  width: 100%;
  height: calc(100% - 110px);
`;

export const TestDiv = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline;
  z-index: 10;
  cursor: pointer;
  background-color: white;
`;

export default MapWrapper;
