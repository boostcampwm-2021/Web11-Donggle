type RateType = {
  safety: number;
  traffic: number;
  food: number;
  entertainment: number;
};

const average = (...values: number[]) => {
  const sum = values.reduce((a, b) => a + b, 0);
  return Number((sum / values.length || 0).toFixed(2));
};

const rateStyle = `
  .star-ratings {
    color: #aaa9a9; 
    position: relative;
    unicode-bidi: bidi-override;
    width: max-content;
    -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 1.3px;
    -webkit-text-stroke-color: #2b2a29;
  }
  
  .star-ratings-fill {
    color: #fff58c;
    padding: 0;
    position: absolute;
    z-index: 1;
    display: flex;
    top: 0;
    left: 0;
    overflow: hidden;
    -webkit-text-fill-color: gold;
  }
  
  .star-ratings-base {
    z-index: 0;
    padding: 0;
  }
`;

const markerStyle = `
  .customoverlay {
    position: relative;
    bottom: 15px;
    border-radius: 6px;
    border: 1px solid #ccc;
    border-bottom: 2px solid #ddd;
    background: #fff;
    font-weight: bold;
    float: left;
  }

  .customoverlay:nth-of-type(n) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
  }

  .customoverlay .title {
    display: block;
    text-align: center;
    padding: 10px 15px;
  }

  .customoverlay:after {
    content: '';
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: -12px;
    width: 22px;
    height: 12px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
  }
`;

const ratingToPercent = (rate: number) => {
  return (rate / 5) * 100;
};

const $starRate = (rate: number) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <style scoped>${rateStyle}</style>
    <div class="star-ratings">
      <div class="star-ratings-fill" style="width: ${ratingToPercent(rate)}%">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
      <div class="star-ratings-base">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
    </div>
  `;
  return wrapper;
};

const $marker = (rates: RateType) => {
  const wrapper = document.createElement('div');
  const averageRate = average(
    ...Object.keys(rates).map((category) => rates[category]),
  );
  wrapper.innerHTML = `
    <style scoped>${markerStyle}</style>
    <div class="customoverlay">
      <div class="title"></div>
    </div>
  `;
  wrapper.querySelector('.title')?.append($starRate(averageRate));
  return wrapper;
};

const $largeMarker = (address: string, rates: RateType) => {
  const wrapper = document.createElement('div');
  const averageRate = average(
    ...Object.keys(rates).map((category) => rates[category]),
  );
  wrapper.innerHTML = `
    <div class="customoverlay">
      <style scoped>${markerStyle}</style>
      <div class="title">${address}</div>
      <div class="title">${address}</div>
    </div>
  `;
  return wrapper;
};

export { $marker, $largeMarker };
