import React, { useRef, useEffect, useState } from 'react';
import MapWrapper from '@components/Map/index.style';

declare global {
  interface Window {
    kakao: any;
  }

  interface latlng {
    latitude: number;
    longitude: number;
  }
}

const Map: React.FC = () => {
  const mapWrapper = useRef<HTMLDivElement>(null);
  const map = useRef(null);
  const [{ latitude, longitude }, setLatlng] = useState({
    latitude: 33.450701,
    longitude: 126.570667,
  });

  const getLocation = (map) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        map.setCenter({ latitude, longitude });
      });
    } else {
      map.setCenter({ latitude: 33.450701, longitude: 126.570667 });
    }
  };

  const changeCenter = (map) => () => {
    const latlng = map.getCenter();
    setLatlng({ latitude: latlng.getLat(), longitude: latlng.getLng() });
  };

  useEffect(() => {
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    map.current = new window.kakao.maps.Map(mapWrapper.current, options);
    getLocation(map.current);

    window.kakao.maps.event.addListener(map.current, 'center_changed', () =>
      changeCenter(map.current),
    );
    return () =>
      window.kakao.maps.event.removeListener(
        map.current,
        'center_changed',
        changeCenter(map.current),
      );
  }, []);

  return <MapWrapper ref={mapWrapper} />;
};

export default Map;
