import { IMapInfo } from '@myTypes/Map';
import { calcTotal } from '@utils/common';
import { Category } from '@utils/enum';

const ratingToPercent = (rate: number) => {
  return rate * 20;
};

const markerTitleHTML = (address: string, rate: number): string => {
  return `
    <div class="title">
      <span>${address}</span>
      <span class="star-rating-single">${isNaN(rate) ? '' : '★'}</span>
      <span>${isNaN(rate) ? '' : rate.toFixed(1)}</span>
    </div>
  `;
};

const starRateHTML = (rate: number): string => {
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

const markerEl = (
  rateData: IMapInfo,
  type: 'small' | 'large' = 'small',
): HTMLDivElement => {
  const wrapper = document.createElement('div');
  wrapper.className = 'customoverlay';

  const { address, count, categories } = rateData;
  const total = calcTotal(categories);
  const averageRate = total / count;

  wrapper.dataset.address = address;
  wrapper.dataset.rateData = JSON.stringify(rateData);

  let displayAddress: string;
  if (type === 'large') {
    displayAddress = address;
  } else {
    const regions = address.split(' ');
    displayAddress = regions[regions.length - 1];
  }

  let innerHTML = markerTitleHTML(displayAddress, averageRate);
  if (type === 'large') {
    innerHTML += Object.keys(categories)
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
  }

  wrapper.innerHTML = innerHTML;
  return wrapper;
};

const createMarkers = (rateDatas: IMapInfo[]): kakao.maps.CustomOverlay[] => {
  return rateDatas.map((rateData) => {
    const { center } = rateData;
    const marker = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(...center),
      yAnchor: 1,
    });

    rateData.hashtags = Object.fromEntries(
      new Map(Object.entries(rateData.hashtags)).entries(),
    );
    const defaultMarker = markerEl(rateData);
    const largeMarker = markerEl(rateData, 'large');

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
): void => {
  markers.forEach((marker) => marker.setMap(map));
};

const deleteMarkers = (markers: kakao.maps.CustomOverlay[]): void => {
  markers.forEach((marker) => marker.setMap(null));
};

const createMarkerClickListener = (
  onClick: (rateData: IMapInfo) => void,
  onOutsideClick: () => void,
): ((e: MouseEvent) => void) => {
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

const findMarker = (
  markers: kakao.maps.CustomOverlay[],
  address: string,
): kakao.maps.CustomOverlay | undefined => {
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
