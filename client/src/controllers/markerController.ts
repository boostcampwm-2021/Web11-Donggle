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
  return Math.random() * (to - from) + from;
};

const getRandomLatLng = () => {
  return [random(33, 38), random(124, 132)];
};

const getRandomRate = () => {
  return random(0, 5);
};

const average = (...values: number[]) => {
  const sum = values.reduce((a, b) => a + b, 0);
  return (sum / values.length || 0).toFixed(2);
};

// TODO: fetch 요청
const requestMarkerInfo = async (
  scale: number,
  region: string[],
): Promise<MarkerInfo[]> => {
  console.log(scale, region);
  return Array(20)
    .fill(0)
    .map(() => {
      return {
        address: '서울특별시 송파구',
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
    const content = markerTemplate(markerInfo);
    return new kakao.maps.CustomOverlay({
      content: content,
      position: new kakao.maps.LatLng(...center),
    });
  });
};

const markerTemplate = (markerInfo: MarkerInfo) => {
  const { address, rates } = markerInfo;
  const averageRate = average(
    ...Object.keys(rates).map((category) => rates[category]),
  );
  return `
    <div style="background-color: rgb(0, 0, 0, 0.6)">
      <span>${address}</span>
      <span>${averageRate}</span>
    </div>
  `;
};

const displayMarkers = (
  markers: kakao.maps.CustomOverlay[],
  map: kakao.maps.Map,
) => {
  markers.forEach((marker) => marker.setMap(map));
};

const hideMarkers = (markers: kakao.maps.CustomOverlay[]) => {
  markers.forEach((marker) => marker.setMap(null));
};

export { requestMarkerInfo, createMarkers, displayMarkers, hideMarkers };
