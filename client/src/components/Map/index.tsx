import MapWrapper, {
  CenterMarker,
  SearchbarWrapper,
} from '@components/Map/index.style';
import Searchbar from '@components/Searchbar/index';
import {
  getCurrentLocation,
  coordToRegion,
  isRangeEqual,
  createPolygons,
  displayPolygons,
  deletePolygons,
  addPolygonClickEvent,
  removePolygonClickEvent,
} from '@controllers/mapController';
import {
  createMarkers,
  displayMarkers,
  deleteMarkers,
  createMarkerClickListener,
  findMarker,
} from '@controllers/markerController';

import { IMapInfo, IPolygon, IRange } from '@myTypes/Map';
import './markerStyle.css';

import { IReviewContent } from '@myTypes/Review';
import { fetchContentData } from '@controllers/sidebarController';
import { IAPIResult } from '@myTypes/Common';
import useRates from '@hooks/useRates';
import { regionToRange } from '@utils/address';
import usePaths from '@hooks/usePaths';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { showSnackbar } from '@utils/common';

const DEFAULT_POSITION = {
  latitude: 37.541,
  longitude: 126.986,
  scale: 9,
};

const DEFAULT_RANGE: IRange = {
  address: '',
  scope: 'medium',
};

interface IProps {
  openSidebar: () => void;
  closeSidebar: () => void;
  currentAddress: React.MutableRefObject<string>;
  updateSidebarRate: (rateData: IMapInfo) => void;
  updateSidebarContents: (contentsData: IReviewContent[]) => void;
}

const MapComponent: React.FC<IProps> = ({
  openSidebar,
  closeSidebar,
  currentAddress,
  updateSidebarRate,
  updateSidebarContents,
}) => {
  const mapWrapper = useRef<HTMLDivElement | null>(null);
  const isDragged = useRef(false);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [range, setRange] = useState(DEFAULT_RANGE);

  const { rates } = useRates(range);
  const { paths } = usePaths(range);

  const [markers, setMarkers] = useState(Array<kakao.maps.CustomOverlay>());
  const [polygons, setPolygons] = useState(Array<IPolygon>());

  const moveTo = useCallback(
    (to: IMapInfo) => {
      if (map === null) {
        return;
      }
      const [x, y] = to.center;
      const newCenter = new kakao.maps.LatLng(x, y);
      map.setCenter(newCenter);
      let newLevel = 9;
      switch (to.codeLength) {
        case 2:
          newLevel = 9;
          break;
        case 5:
          newLevel = 6;
          break;
        case 7:
          newLevel = 6;
          break;
        default:
          break;
      }
      map.setLevel(newLevel);
    },
    [map],
  );

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
    };
    getCurrentLocation(onCurrentLocation);

    const updateRange = async () => {
      const latlng = kakaoMap.getCenter();
      const [latitude, longitude] = [latlng.getLat(), latlng.getLng()];
      const scale = kakaoMap.getLevel();

      try {
        const region = (await coordToRegion(latitude, longitude)) as {
          result: Array<string>;
          status: string;
        };
        if (region.status !== kakao.maps.services.Status.OK) throw Error();

        const newRange = regionToRange(region.result, scale);
        setRange((oldRange) => {
          if (isRangeEqual(oldRange, newRange)) return oldRange;
          return newRange;
        });
      } catch (error) {
        showSnackbar('지역 정보를 불러오는 데 실패했습니다.', true);
        return;
      }
    };

    const notifyDragend = () => {
      isDragged.current = true;
      setTimeout(() => {
        isDragged.current = false;
      });
    };

    kakao.maps.event.addListener(kakaoMap, 'dragend', notifyDragend);
    kakao.maps.event.addListener(kakaoMap, 'idle', updateRange);
    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'dragend', notifyDragend);
      kakao.maps.event.removeListener(kakaoMap, 'idle', updateRange);
    };
  }, []);

  useEffect(() => {
    if (!mapWrapper.current) return;
    const wrapper = mapWrapper.current;

    const onClick = async (rateData: IMapInfo) => {
      if (isDragged.current) return;
      if (currentAddress.current === rateData.address) return;
      currentAddress.current = rateData.address;
      const sidebarContents: IAPIResult<IReviewContent[]> =
        await fetchContentData(rateData.address, 'review');

      updateSidebarRate(rateData);
      updateSidebarContents(sidebarContents.result || []);
      openSidebar();
    };

    const onOutsideClick = () => {
      if (isDragged.current) return;
      closeSidebar();
    };

    const onMarkerClicked = createMarkerClickListener(onClick, onOutsideClick);
    wrapper.addEventListener('click', onMarkerClicked);
    return () => wrapper.removeEventListener('click', onMarkerClicked);
  }, [openSidebar, closeSidebar, updateSidebarRate, updateSidebarContents]);

  useEffect(() => {
    if (!paths) return;
    const polygons = createPolygons(paths);
    setPolygons(polygons);
  }, [paths]);

  useEffect(() => {
    if (!rates) return;
    const markers = createMarkers(rates);
    setMarkers(markers);
  }, [rates]);

  useEffect(() => {
    if (!map) return;

    displayPolygons(polygons, map);
    return () => deletePolygons(polygons);
  }, [map, polygons]);

  useEffect(() => {
    if (!map) return;

    displayMarkers(markers, map);
    return () => deleteMarkers(markers);
  }, [map, markers]);

  useEffect(() => {
    polygons.forEach((polygon) => {
      const onClick = async () => {
        const matchingMarker = findMarker(markers, polygon.address);
        if (!matchingMarker) return;

        const markerEl = matchingMarker.getContent() as HTMLElement;
        const sidebarRate = JSON.parse(markerEl.dataset.rateData as string);
        if (currentAddress.current === sidebarRate.address) return;
        currentAddress.current = sidebarRate.address;

        const sidebarContents: IAPIResult<IReviewContent[]> =
          await fetchContentData(polygon.address, 'review');

        updateSidebarRate(sidebarRate);
        updateSidebarContents(sidebarContents.result || []);
        openSidebar();
      };
      addPolygonClickEvent(polygon, onClick);
    });

    return () => {
      polygons.forEach((polygon) => {
        removePolygonClickEvent(polygon);
      });
    };
  }, [
    polygons,
    markers,
    openSidebar,
    updateSidebarRate,
    updateSidebarContents,
  ]);

  return (
    <>
      <MapWrapper ref={mapWrapper}>
        <SearchbarWrapper>
          <Searchbar onClickHandler={moveTo} />
        </SearchbarWrapper>
        <CenterMarker />
      </MapWrapper>
    </>
  );
};

export default React.memo(MapComponent);
