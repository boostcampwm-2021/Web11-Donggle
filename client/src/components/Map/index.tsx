import React, { useRef, useEffect, useState } from 'react';
import MapWrapper from '@components/Map/index.style';
import transCoord from './data';

interface latlng {
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const mapWrapper = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [{ latitude, longitude }, setLatlng] = useState({
    latitude: 33.450701,
    longitude: 126.570667,
  });

  // 초기 위치 값 가져오기
  const getLocation = (map: kakao.maps.Map) => {
    let coord: [number, number] = [37.5642135, 127.0016985];

    const successCallback: PositionCallback = (position) => {
      const { latitude, longitude } = position.coords;
      coord = [latitude, longitude];
      map.setCenter(new kakao.maps.LatLng(...coord));
    };

    const errorCallback: PositionErrorCallback = () => {
      map.setCenter(new kakao.maps.LatLng(...coord));
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      errorCallback(new GeolocationPositionError());
    }
  };

  useEffect(() => {
    if (!mapWrapper.current) {
      return;
    }

    const wrapper = mapWrapper.current;
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 7,
    };

    const kakaoMap = new kakao.maps.Map(wrapper, options);
    setMap(kakaoMap);
    getLocation(kakaoMap);

    const changeCenter = () => {
      const latlng = kakaoMap.getCenter();
      setLatlng({ latitude: latlng.getLat(), longitude: latlng.getLng() });
    };

    kakao.maps.event.addListener(kakaoMap, 'dragend', changeCenter);
    return () =>
      kakao.maps.event.removeListener(kakaoMap, 'dragend', changeCenter);
  }, []);

  useEffect(() => {
    if (!map) return;

    (async () => {
      const originCoords = await transCoord();

      const convertGeoJson = (origin) =>
        origin.map((region) => ({
          name: region.name,
          path: region.path.map(
            (coord: [number, number]) => new kakao.maps.LatLng(...coord),
          ),
        }));

      const displayArea = (area) => {
        console.log('ArEA!!', area);

        return new kakao.maps.Polygon({
          map: map,
          path: area.path,
          strokeWeight: 2,
          strokeColor: '#004c80',
          strokeOpacity: 0.8,
          fillColor: '#fff',
          fillOpacity: 0.7,
        });
      };

      const convertedAreas = await convertGeoJson(originCoords);
      console.log(convertedAreas);
      convertedAreas.forEach(displayArea);
    })();
  }, [map]);

  return <MapWrapper ref={mapWrapper} />;
};

export default Map;
