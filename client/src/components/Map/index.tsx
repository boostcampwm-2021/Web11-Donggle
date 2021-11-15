import MapWrapper, { CenterMarker } from '@components/Map/index.style';
import Searchbar from '@components/Searchbar/index';

import {
  getCurrentLocation,
  coordToRegionCode,
  isRangeEqual,
  createPolygons,
  displayPolygons,
  deletePolygons,
  LFURegions,
  addPolygonClickEvent,
  removePolygonClickEvent,
  RegionPolygon,
} from '@controllers/mapController';

import {
  createMarkers,
  displayMarkers,
  deleteMarkers,
  createMarkerClickListener,
  LFURates,
  findMarker,
} from '@controllers/markerController';

import './markerStyle.css';

import React, { useRef, useEffect, useState } from 'react';

const DEFAULT_POSITION = {
  latitude: 37.541,
  longitude: 126.986,
  scale: 9,
};

interface IProps {
  openSidebar: () => void;
  closeSidebar: () => void;
  updateSidebarRate: (rateData: RateType) => void;
  toggleSidebar: () => void;
}

const MapComponent: React.FC<IProps> = ({
  openSidebar,
  closeSidebar,
  updateSidebarRate,
}) => {
  const mapWrapper = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const polygonCache = useRef(new Map());
  const markerCache = useRef(new Map());

  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [range, setRange] = useState({
    region: Array<string>(),
    scale: DEFAULT_POSITION.scale,
  });

  const [markers, setMarkers] = useState(Array<kakao.maps.CustomOverlay>());
  const [polygons, setPolygons] = useState(Array<RegionPolygon>());

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
    const zoomControl = new kakao.maps.ZoomControl();
    kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMLEFT);
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
    if (!mapWrapper.current) return;

    const wrapper = mapWrapper.current;
    const onClick = (rateData: RateType) => {
      updateSidebarRate(rateData);
      openSidebar();
    };
    const onMarkerClicked = createMarkerClickListener(onClick, closeSidebar);

    wrapper.addEventListener('click', onMarkerClicked);
    return () => wrapper.removeEventListener('click', onMarkerClicked);
  }, [openSidebar, closeSidebar, updateSidebarRate]);

  useEffect(() => {
    const updateRange = async () => {
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
    };
    updateRange();
  }, [position]);

  useEffect(() => {
    const { scale, region } = range;
    const updatePolygons = async () => {
      const regions = await LFURegions(polygonCache.current, scale, region);
      const polygons = createPolygons(regions);
      setPolygons(polygons);
    };
    updatePolygons();
  }, [range]);

  useEffect(() => {
    if (!map) return;

    displayPolygons(polygons, map);
    return () => deletePolygons(polygons);
  }, [map, polygons]);

  useEffect(() => {
    const { scale, region } = range;
    const updateMarkers = async () => {
      const rates = (await LFURates(
        markerCache.current,
        scale,
        region,
      )) as RateType[];
      const markers = createMarkers(rates);
      setMarkers(markers);
    };
    updateMarkers();
  }, [range]);

  useEffect(() => {
    if (!map) return;

    displayMarkers(markers, map);
    return () => deleteMarkers(markers);
  }, [map, markers]);

  useEffect(() => {
    polygons.forEach((polygon) => {
      const onClick = () => {
        kakao.maps.event.preventMap();
        const matchingMarker = findMarker(markers, polygon.address);
        if (!matchingMarker) return;

        const markerEl = matchingMarker.getContent() as HTMLElement;
        const sidebarRate = JSON.parse(markerEl.dataset.rateData as string);

        updateSidebarRate(sidebarRate);
        openSidebar();
      };
      addPolygonClickEvent(polygon, onClick);
    });

    return () => {
      polygons.forEach((polygon) => {
        removePolygonClickEvent(polygon);
      });
    };
  }, [polygons, markers, openSidebar, updateSidebarRate]);

  return (
    <MapWrapper ref={mapWrapper}>
      <Searchbar map={map} />
      <CenterMarker />
    </MapWrapper>
  );
};

export default MapComponent;
