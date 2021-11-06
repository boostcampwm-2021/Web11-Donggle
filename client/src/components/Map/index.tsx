import MapWrapper from '@components/Map/index.style';
import {
  getCurrentLocation,
  requestCoord,
  coordToAddress,
  coordToRegionCode,
  drawPolygon,
  deletePolygon,
} from '@controllers/mapController';

import React, { useRef, useEffect, useState } from 'react';

// 처음 접속할 때, 가져와야 함
// 드래그 앤 드랍할 때, 축척 변경할 때, 가져와야 함

interface latlng {
  latitude: number;
  longitude: number;
}

const DEFAULT_SCALE = 7;
const polygonInstances: Array<kakao.maps.Polygon> = [];

const Map: React.FC = () => {
  const mapWrapper = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [{ latitude, longitude }, setLatlng] = useState({
    latitude: 33.450701,
    longitude: 126.570667,
  });
  const [scale, setScale] = useState(DEFAULT_SCALE);

  useEffect(() => {
    if (!mapWrapper.current) {
      return;
    }

    const wrapper = mapWrapper.current;
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: DEFAULT_SCALE,
    };

    const kakaoMap = new kakao.maps.Map(wrapper, options);
    setMap(kakaoMap);

    const onCurrentLocation = ([lat, lng]: [number, number]) => {
      kakaoMap.setCenter(new kakao.maps.LatLng(lat, lng));
      setLatlng({ latitude: lat, longitude: lng });
    };

    getCurrentLocation(onCurrentLocation);

    const changeCenter = async () => {
      const latlng = kakaoMap.getCenter();
      const latitude = latlng.getLat();
      const longitude = latlng.getLng();
      setLatlng({ latitude, longitude });
    };

    const changeScale = async () => {
      const latlng = kakaoMap.getCenter();
      const scale = kakaoMap.getLevel();
      setLatlng({ latitude: latlng.getLat(), longitude: latlng.getLng() });
      setScale(scale);
    };

    kakao.maps.event.addListener(kakaoMap, 'dragend', changeCenter);
    kakao.maps.event.addListener(kakaoMap, 'zoom_changed', changeScale);
    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'dragend', changeCenter);
      kakao.maps.event.removeListener(kakaoMap, 'zoom_changed', changeScale);
    };
  }, []);

  useEffect(() => {
    if (!map) return;
    let polygonInstances = Array<kakao.maps.Polygon>();
    const managePolygon = async () => {
      // 중심 좌표의 주소 가져오기
      const region: { result: Array<string>; status: string } =
        (await coordToRegionCode(latitude, longitude)) as {
          result: Array<string>;
          status: string;
        };

      if (region.status !== 'OK') return;
      // 백엔드 요청
      const regions = await requestCoord(scale, region.result);
      // 폴리곤 그리기
      polygonInstances = drawPolygon(map, regions);
    };

    managePolygon();

    return () => {
      deletePolygon(polygonInstances);
    };
  }, [map, scale, latitude, longitude]);
  return <MapWrapper ref={mapWrapper} />;
};

export default Map;
