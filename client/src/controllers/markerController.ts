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
      <span class="star-rating-single">${isNaN(rate) ? '' : '★'}</span>
      <span>${isNaN(rate) ? '' : rate.toFixed(1)}</span>
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
  wrapper.innerHTML = `
    <div class="title">
      <span>${address}</span>
      <span class="star-rating-single">${!count ? '' : '★'}</span>
      <span>${!count ? '' : averageRate.toFixed(1)}</span>
    </div>
    <div class="content">
      <span>안전 </span>
      ${starRateHTML(safety || 0)}
      <span>${!count ? 'N/A' : safety.toFixed(1)}</span>
    </div>
    <div class="content">
      <span>교통 </span>
      ${starRateHTML(traffic || 0)}
      <span>${!count ? 'N/A' : traffic.toFixed(1)}</span>
    </div>
    <div class="content">
      <span>먹거리 </span>
      ${starRateHTML(food || 0)}
      <span>${!count ? 'N/A' : food.toFixed(1)}</span>
    </div>
    <div class="content">
      <span>놀거리 </span>
      ${starRateHTML(entertainment || 0)}
      <span>${!count ? 'N/A' : entertainment.toFixed(1)}</span>
    </div>
  `;
  return wrapper;
};

const random = (from: number, to: number) => {
  return Number((Math.random() * (to - from) + from).toFixed(2));
};

const getRandomRate = () => {
  return random(1, 5);
};

const regionToRates = (region): RateType => {
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
const requestRates = async (
  scale: number,
  region: string[],
): Promise<RateType[]> => {
  return await fetch(
    `${process.env.REACT_APP_API_URL}/api/map/rates?scale=${scale}&big=${region[0]}&medium=${region[1]}&small=${region[2]}`,
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
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

const LFURates = async (
  cache: Map<string, RateType[] & { hitCount: number }>,
  scale: number,
  region: string[],
) => {
  const [big, medium] = region;
  let key = '';

  switch (true) {
    case scale < 9:
      key = `${big} ${medium}`;
      break;
    case 9 <= scale && scale < 12:
      key = `${big}`;
      break;
    case 12 <= scale:
      key = 'all';
      break;
  }

  if (cache.has(key)) {
    const rateData = cache.get(key);
    if (rateData) rateData.hitCount++;
    return rateData;
  } else {
    const rates = (await requestRates(scale, region)) as RateType[] & {
      hitCount: number;
    };
    rates.hitCount = 1;
    if (cache.size > 10) {
      const mostUnusedRates = Array.from(cache.entries()).sort(
        ([, rates1], [, rates2]) => rates1.hitCount - rates2.hitCount,
      )[0][0];
      cache.delete(mostUnusedRates);
    }
    cache.set(key, rates);
    return rates;
  }
};

export {
  requestRates,
  createMarkers,
  displayMarkers,
  deleteMarkers,
  regionToRates,
  createMarkerClickListener,
  LFURates,
};
