import { regionToScaled } from '@utils/address';

type RateType = {
  safety: number;
  traffic: number;
  food: number;
  entertainment: number;
};

type MarkerInfo = {
  address: string;
  center: [number, number];
  rates: RateType;
};

const average = (...values: number[]) => {
  const sum = values.reduce((a, b) => a + b, 0);
  return Number((sum / values.length || 0).toFixed(2));
};

const ratingToPercent = (rate: number) => {
  return rate * 20;
};

const starRateHTML = (rate: number) => {
  return `
    <div class="star-ratings">
      <div class="star-ratings-fill" style="width: ${ratingToPercent(rate)}%">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
      <div class="star-ratings-base">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
    </div>
  `;
};

const markerEl = (address: string, rates: RateType) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'customoverlay';

  const averageRate = average(
    ...Object.keys(rates).map((category) => rates[category]),
  );
  const region = address.split(' ');
  const smallestRegion = region[region.length - 1];
  wrapper.innerHTML = `
    <div class="title">
      <span>${smallestRegion}</span>
      <span class="star-rating-single">★</span>
      <span>${averageRate}</span>
    </div>
  `;
  return wrapper;
};

const largeMarkerEl = (address: string, rates: RateType) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'customoverlay customoverlay_large';
  const averageRate = average(
    ...Object.keys(rates).map((category) => rates[category]),
  );

  wrapper.dataset.address = address;
  wrapper.dataset.starRate = `${averageRate}`;
  wrapper.dataset.safety = `${rates.safety}`;
  wrapper.dataset.traffic = `${rates.traffic}`;
  wrapper.dataset.food = `${rates.food}`;
  wrapper.dataset.entertainment = `${rates.entertainment}`;

  wrapper.innerHTML = `
    <div class="title">
      <span>${address}</span>
      <span class="star-rating-single">★</span>
      <span>${averageRate}</span>
    </div>
    <div class="content">
      <span>안전 </span>
      ${starRateHTML(rates.safety)}
      <span>${rates.safety}</span>
    </div>
    <div class="content">
      <span>교통 </span>
      ${starRateHTML(rates.traffic)}
      <span>${rates.traffic}</span>
    </div>
    <div class="content">
      <span>먹거리 </span>
      ${starRateHTML(rates.food)}
      <span>${rates.food}</span>
    </div>
    <div class="content">
      <span>놀거리 </span>
      ${starRateHTML(rates.entertainment)}
      <span>${rates.entertainment}</span>
    </div>
  `;
  return wrapper;
};

const random = (from: number, to: number) => {
  return Number((Math.random() * (to - from) + from).toFixed(2));
};

const getRandomLatLng = () => {
  return [random(33, 38), random(124, 132)];
};

const getRandomRate = () => {
  return random(1, 5);
};

const regionToMarkerInfo = (region) => {
  return {
    address: region.address,
    center: region.center,
    rates: {
      safety: getRandomRate(),
      traffic: getRandomRate(),
      food: getRandomRate(),
      entertainment: getRandomRate(),
    },
  };
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
        address: regionToScaled(region, scale),
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

    defaultMarker.addEventListener('mouseenter', () => {
      marker.setContent(largeMarker);
      marker.setZIndex(1);
    });
    largeMarker.addEventListener('mouseleave', () => {
      marker.setContent(defaultMarker);
      marker.setZIndex(0);
    });
    marker.setContent(defaultMarker);
    return marker;
  });
};

const markerDefault = (markerInfo: MarkerInfo) => {
  const { address, rates } = markerInfo;
  return markerEl(address, rates);
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

const createMarkerClickListener = (
  onClick: (content) => void,
  onOutsideClick: () => void,
) => {
  const onMarkerClicked = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const markerEl = target.closest('.customoverlay_large') as HTMLElement;
    if (!markerEl) {
      onOutsideClick();
      return;
    }
    onClick({
      address: markerEl.dataset.address,
      starRate: Number(markerEl.dataset.starRate),
      categoryRate: {
        safety: Number(markerEl.dataset.safety),
        traffic: Number(markerEl.dataset.traffic),
        food: Number(markerEl.dataset.food),
        entertainment: Number(markerEl.dataset.entertainment),
      },
    });
  };
  return onMarkerClicked;
};

export {
  requestMarkerInfo,
  createMarkers,
  displayMarkers,
  deleteMarkers,
  regionToMarkerInfo,
  createMarkerClickListener,
};
