import { markerEl, largeMarkerEl } from '@utils/marker';

type MarkerInfo = {
  address: string;
  center: [number, number];
  rates: {
    safety: number;
    traffic: number;
    food: number;
    entertainment: number;
  };
};

// test
const random = (from: number, to: number) => {
  return Number((Math.random() * (to - from) + from).toFixed(2));
};

const getRandomLatLng = () => {
  return [random(33, 38), random(124, 132)];
};

const getRandomRate = () => {
  return random(0, 5);
};

// TODO: fetch 요청
const requestMarkerInfo = async (
  scale: number,
  region: string[],
): Promise<MarkerInfo[]> => {
  return Array(100)
    .fill(0)
    .map(() => {
      return {
        address: region.join(' ') + ` ${scale}`,
        center: getRandomLatLng() as [number, number],
        rates: {
          safety: getRandomRate(),
          traffic: getRandomRate(),
          food: getRandomRate(),
          entertainment: getRandomRate(),
        },
      };
    });
};

const createMarkers = (
  markerInfos: MarkerInfo[],
): kakao.maps.CustomOverlay[] => {
  return markerInfos.map((markerInfo) => {
    const { center } = markerInfo;
    const marker = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(...center),
    });

    const defaultMarker = markerDefault(markerInfo);
    const largeMarker = markerMouseOver(markerInfo);

    defaultMarker.addEventListener('mouseover', () => {
      marker.setContent(largeMarker);
    });
    largeMarker.addEventListener('mouseout', () =>
      marker.setContent(defaultMarker),
    );
    marker.setContent(defaultMarker);
    return marker;
  });
};

const markerDefault = (markerInfo: MarkerInfo) => {
  const { rates } = markerInfo;
  return markerEl(rates);
};

const markerMouseOver = (markerInfo: MarkerInfo) => {
  const { address, rates } = markerInfo;
  return largeMarkerEl(address, rates);
};

const displayMarkers = (
  markers: kakao.maps.CustomOverlay[],
  map: kakao.maps.Map,
) => {
  markers.forEach((marker) => marker.setMap(map));
};

const deleteMarkers = (markers: kakao.maps.CustomOverlay[]) => {
  markers.forEach((marker) => marker.setMap(null));
};

export { requestMarkerInfo, createMarkers, displayMarkers, deleteMarkers };
