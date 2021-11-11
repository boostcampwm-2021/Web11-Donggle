import { regionToScaled } from '@utils/address';
import { RateType } from '@pages/MainPage';

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

const markerEl = (address: string, rate: number) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'customoverlay';

  const region = address.split(' ');
  const smallestRegion = region[region.length - 1];
  wrapper.innerHTML = `
    <div class="title">
      <span>${smallestRegion}</span>
      <span class="star-rating-single">★</span>
      <span>${rate.toFixed(1)}</span>
    </div>
  `;
  return wrapper;
};

const largeMarkerEl = (rateData: RateType) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'customoverlay customoverlay_large';

  const { address, total, count, categories } = rateData;
  const averageRate = total / count;

  const safety = categories.safety / count;
  const traffic = categories.traffic / count;
  const food = categories.food / count;
  const entertainment = categories.entertainment / count;

  wrapper.dataset.rateData = JSON.stringify(rateData);

  wrapper.dataset.code = wrapper.innerHTML = `
    <div class="title">
      <span>${address}</span>
      <span class="star-rating-single">★</span>
      <span>${averageRate.toFixed(1)}</span>
    </div>
    <div class="content">
      <span>안전 </span>
      ${starRateHTML(safety)}
      <span>${safety.toFixed(1)}</span>
    </div>
    <div class="content">
      <span>교통 </span>
      ${starRateHTML(traffic)}
      <span>${traffic.toFixed(1)}</span>
    </div>
    <div class="content">
      <span>먹거리 </span>
      ${starRateHTML(food)}
      <span>${food.toFixed(1)}</span>
    </div>
    <div class="content">
      <span>놀거리 </span>
      ${starRateHTML(entertainment)}
      <span>${entertainment.toFixed(1)}</span>
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

const regionToMarkerInfo = (region): RateType => {
  const count = random(0, 100);
  const safety = getRandomRate() * count;
  const traffic = getRandomRate() * count;
  const food = getRandomRate() * count;
  const entertainment = getRandomRate() * count;

  return {
    address: region.address,
    code: region.code,
    codeLength: region.codeLength,
    center: region.center,
    total: (safety + traffic + food + entertainment) / 4,
    count: count,
    categories: {
      safety,
      traffic,
      food,
      entertainment,
    },
  };
};

// TODO: fetch 요청
const requestMarkerInfo = async (
  scale: number,
  region: string[],
): Promise<RateType[]> => {
  return Array(100)
    .fill(0)
    .map(() => {
      return {
        address: regionToScaled(region, scale),
        code: '',
        codeLength: 0,
        center: getRandomLatLng() as [number, number],
        total: 0,
        count: 0,
        categories: {
          safety: getRandomRate(),
          traffic: getRandomRate(),
          food: getRandomRate(),
          entertainment: getRandomRate(),
        },
      };
    });
};

const createMarkers = (rateDatas: RateType[]): kakao.maps.CustomOverlay[] => {
  return rateDatas.map((rateData) => {
    const { center } = rateData;
    const marker = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(...center),
    });

    const defaultMarker = markerDefault(rateData);
    const largeMarker = markerMouseOver(rateData);

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

const markerDefault = (rateData: RateType) => {
  const { address, total, count } = rateData;
  return markerEl(address, total / count);
};

const markerMouseOver = (rateData: RateType) => {
  return largeMarkerEl(rateData);
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
  onClick: (rateData: RateType) => void,
  onOutsideClick: () => void,
) => {
  const onMarkerClicked = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const markerEl = target.closest('.customoverlay_large') as HTMLElement;
    if (!markerEl) {
      onOutsideClick();
      return;
    }
    onClick(JSON.parse(markerEl.dataset.rateData as string));
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
