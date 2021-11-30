import { IMapInfo } from '@myTypes/Map';
import { calcTotal } from '@utils/common';
import { Category } from '@utils/enum';

const ratingToPercent = (rate: number) => {
  return rate * 20;
};

const markerTitleHTML = (region: string, rate: number) => {
  return `
    <div class="title">
      <span>${region}</span>
      <span class="star-rating-single">${isNaN(rate) ? '' : '★'}</span>
      <span>${isNaN(rate) ? '' : rate.toFixed(1)}</span>
    </div>
  `;
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

const markerEl = (rateData: IMapInfo) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'customoverlay';

  const { address, count, categories } = rateData;
  const total = calcTotal(categories);
  const rate = total / count;

  const region = address.split(' ');
  const smallestRegion = region[region.length - 1];

  wrapper.dataset.address = address;
  wrapper.dataset.rateData = JSON.stringify(rateData);
  wrapper.innerHTML = markerTitleHTML(smallestRegion, rate);
  return wrapper;
};

const largeMarkerEl = (rateData: IMapInfo) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'customoverlay customoverlay_large';

  const { address, count, categories } = rateData;
  const total = calcTotal(categories);
  const averageRate = total / count;

  wrapper.dataset.address = address;
  wrapper.dataset.rateData = JSON.stringify(rateData);

  let wrapperHTML = markerTitleHTML(address, averageRate);
  wrapperHTML += Object.keys(categories)
    .map((category) => {
      const score = categories[category] / count;
      return `
      <div class="content">
        <span>${Category[category]} </span>
        ${starRateHTML(score || 0)}
        <span>${!count ? 'N/A' : score.toFixed(1)}</span>
      </div>
    `;
    })
    .join('');

  wrapper.innerHTML = wrapperHTML;
  return wrapper;
};

const createMarkers = (rateDatas: IMapInfo[]): kakao.maps.CustomOverlay[] => {
  return rateDatas.map((rateData) => {
    const { center } = rateData;
    const marker = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(...center),
    });

    rateData.hashtags = Object.fromEntries(
      new Map(Object.entries(rateData.hashtags)).entries(),
    );
    const defaultMarker = markerEl(rateData);
    const largeMarker = largeMarkerEl(rateData);

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
  onClick: (rateData: IMapInfo) => void,
  onOutsideClick: () => void,
) => {
  const onMarkerClicked = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const markerEl = target.closest('.customoverlay') as HTMLElement;
    if (!markerEl) {
      if (!target.closest('path')) onOutsideClick();
      return;
    }
    onClick(JSON.parse(markerEl.dataset.rateData as string));
  };
  return onMarkerClicked;
};

const findMarker = (markers: kakao.maps.CustomOverlay[], address: string) => {
  return markers.find((marker) => {
    const markerEl = marker.getContent() as HTMLElement;
    return address === markerEl.dataset.address;
  });
};

export {
  createMarkers,
  displayMarkers,
  deleteMarkers,
  createMarkerClickListener,
  findMarker,
};
