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

  // 초기 위치 값 가져오기
  const getLocation = (map) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const coord = new window.kakao.maps.LatLng(latitude, longitude);
        map.setCenter(coord);
      });
    } else {
      const coord = new window.kakao.maps.LatLng(33.450701, 126.570667);
      map.setCenter(coord);
    }
  };

  // 중심 Position 변경 시 동작하는 handler
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

    window.kakao.maps.event.addListener(
      map.current,
      'dragend',
      changeCenter(map.current),
    );
    return () =>
      window.kakao.maps.event.removeListener(
        map.current,
        'dragend',
        changeCenter(map.current),
      );
  }, []);

  return <MapWrapper ref={mapWrapper} />;
};

export default Map;
