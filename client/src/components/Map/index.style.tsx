import marker from '@assets/icons/marker.svg';

import React from 'react';
import styled from 'styled-components';
import isEqual from 'react-fast-compare';

const MapWrapper = React.memo(
  styled.div`
    positon: relative;
    width: 100%;
    height: calc(100% - ${(props) => props.theme.componentSize.header});
  `,
  isEqual,
);

const Marker = styled.img`
  position: absolute;
  left: calc(50% - 25px);
  top: calc(50% - 50px);
  width: 50px;
  height: 50px;
  z-index: 2000;
  user-select: none;
  pointer-events: none;
`;
Marker.defaultProps = { src: marker, alt: 'Marker' };
const CenterMarker = React.memo(Marker);

const SearchbarWrapper = React.memo(
  styled.div`
    position: relative;
    top: 20px;
    left: 20px;
  `,
  isEqual,
);

export default MapWrapper;
export { CenterMarker, SearchbarWrapper };
