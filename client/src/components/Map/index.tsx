import MapWrapper from '@components/Map/index.style';
import {
  getCurrentLocation,
  requestCoord,
  coordToRegionCode,
  isRangeEqual,
  createPolygons,
  displayPolygons,
  deletePolygons,
} from '@controllers/mapController';

import {
  requestMarkerInfo,
  createMarkers,
  displayMarkers,
  deleteMarkers,
} from '@controllers/markerController';

import React, { useRef, useEffect, useState } from 'react';

const DEFAULT_POSITION = {
  latitude: 37.541,
  longitude: 126.986,
  scale: 9,
};

const Map: React.FC = () => {
  const mapWrapper = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [range, setRange] = useState({
    region: Array<string>(),
    scale: DEFAULT_POSITION.scale,
  });

  const [markers, setMarkers] = useState(Array<kakao.maps.CustomOverlay>());
  const [polygons, setPolygons] = useState(Array<kakao.maps.Polygon>());

  useEffect(() => {
    if (!mapWrapper.current) {
      return;
    }

    const wrapper = mapWrapper.current;
    const { latitude, longitude, scale } = DEFAULT_POSITION;
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: scale,
    };

    const kakaoMap = new kakao.maps.Map(wrapper, options);
    setMap(kakaoMap);

    const onCurrentLocation = ([lat, lng]: [number, number]) => {
      kakaoMap.setCenter(new kakao.maps.LatLng(lat, lng));
      setPosition((prevPos) => {
        return { ...prevPos, latitude: lat, longitude: lng };
      });
    };
    getCurrentLocation(onCurrentLocation);

    const updatePosition = () => {
      const latlng = kakaoMap.getCenter();
      const latitude = latlng.getLat();
      const longitude = latlng.getLng();
      const scale = kakaoMap.getLevel();
      setPosition({ latitude, longitude, scale });
    };

    kakao.maps.event.addListener(kakaoMap, 'idle', updatePosition);
    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'idle', updatePosition);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { latitude, longitude, scale } = position;
      const region = (await coordToRegionCode(latitude, longitude)) as {
        result: Array<string>;
        status: string;
      };
      if (region.status !== kakao.maps.services.Status.OK) return;

      const newRange = {
        region: region.result,
        scale: scale,
      };

      setRange((oldRange) => {
        if (isRangeEqual(oldRange, newRange)) return oldRange;
        return newRange;
      });
    })();
  }, [position]);

  useEffect(() => {
    const { scale, region } = range;
    const managePolygon = async () => {
      const regions = await requestCoord(scale, region);
      const polygons = createPolygons(regions);
      setPolygons(polygons);
    };
    managePolygon();
  }, [range]);

  useEffect(() => {
    if (!map) return;

    displayPolygons(polygons, map);
    return () => deletePolygons(polygons);
  }, [map, polygons]);

  useEffect(() => {
    (async () => {
      const { scale, region } = range;
      const markerInfos = await requestMarkerInfo(scale, region);
      const markers = createMarkers(markerInfos);
      setMarkers(markers);
    })();
  }, [range]);

  useEffect(() => {
    if (!map) return;

    displayMarkers(markers, map);
    return () => deleteMarkers(markers);
  }, [map, markers]);

  return <MapWrapper ref={mapWrapper} />;
};

export default Map;