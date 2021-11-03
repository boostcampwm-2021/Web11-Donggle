import React, { useRef, useEffect, useState } from 'react';
import MapWrapper from '@components/Map/index.style';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map: React.FC = () => {
  const mapWrapper = useRef<HTMLDivElement>(null);
  const [{ latitude, longitude }, setCoord] = useState({
    latitude: 33.450701,
    longitude: 126.570667,
  });

  useEffect(() => {
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    new window.kakao.maps.Map(mapWrapper.current, options);
  }, []);

  return <MapWrapper ref={mapWrapper} />;
};
export default Map;
