import ColorHash from 'color-hash';

function getCurrentLocation(callback: (coord: [number, number]) => void) {
  // const coord: [number, number] = [37.5642135, 127.0016985];
  let coord: [number, number] = [37.5642135, 127.0016985];

  const successCallback: PositionCallback = (position) => {
    const { latitude, longitude } = position.coords; // (처음 접속)현재 사용자위치
    coord = [latitude, longitude];
    callback(coord);
  };

  const errorCallback: PositionErrorCallback = () => {
    callback(coord);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    errorCallback(new GeolocationPositionError());
  }
}

// 좌표 값에 해당하는 구 주소와 도로명 주소 정보 요청
const coordToAddress = (wtmX: number, wtmY: number) => {
  const geocoder = new kakao.maps.services.Geocoder();
  const coord = new kakao.maps.LatLng(wtmX, wtmY);

  return new Promise((resolve, reject) => {
    geocoder.coord2Address(
      coord.getLng(),
      coord.getLat(),
      function (result, status) {
        if (status == kakao.maps.services.Status.OK)
          resolve(result[0].address.address_name);
        else reject(status);
      },
    );
  });
};

const coordToRegionCode = (latitude: number, longitude: number) => {
  const geocoder = new kakao.maps.services.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.coord2RegionCode(longitude, latitude, function (result, status) {
      if (status === kakao.maps.services.Status.OK)
        resolve({
          result: [
            result[1].region_1depth_name,
            result[1].region_2depth_name,
            result[1].region_3depth_name,
          ],
          status,
        });
      else reject({ result: '', status });
    });
  });
};

const isRangeEqual = (
  range1: { region: string[]; scale: number },
  range2: { region: string[]; scale: number },
) => {
  const [big1, medium1] = range1.region;
  const [big2, medium2] = range2.region;

  switch (true) {
    case range1.scale < 9:
      if (range2.scale >= 9) return false;
      return big1 === big2 && medium1 == medium2;
    case 9 <= range1.scale && range1.scale < 12:
      if (range2.scale < 9 || range2.scale >= 12) return false;
      return big1 === big2;
    case range1.scale >= 12:
      if (range2.scale < 12) return false;
      return true;
    default:
      return true;
  }
};

// backend에 polygon 정보 요청
const requestCoord = async (scale: number, region: Array<string>) => {
  return await fetch(
    `${process.env.REACT_APP_API_URL}/api/map/polygon?scale=${scale}&big=${region[0]}&medium=${region[1]}&small=${region[2]}`,
  )
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
};

const createPolygons = (regions) => {
  const polygons = Array<kakao.maps.Polygon>();
  const colorHash = new ColorHash();
  regions.forEach((region) => {
    const colorString = colorHash.hex(region.address);
    if (region.type === 'Polygon') {
      polygons.push(makeSinglePolygon(region.path, colorString));
    } else {
      polygons.push(...makeMultiPolygon(region.path, colorString));
    }
  });
  return polygons;
};

const addPolygonEvent = (
  polygon: kakao.maps.Polygon,
  callbackIn: () => void,
  callbackOut: () => void,
) => {
  kakao.maps.event.addListener(polygon, 'mouseover', callbackIn);
  kakao.maps.event.addListener(polygon, 'mouseout', callbackOut);
};

const makeSinglePolygon = (coords: [number, number][], colorString: string) => {
  const coordObjects = coords.map(
    (coord: [number, number]) => new kakao.maps.LatLng(...coord),
  );

  const polygon = new kakao.maps.Polygon({
    path: coordObjects,
    strokeWeight: 2,
    strokeColor: colorString,
    strokeOpacity: 0.8,
    fillColor: colorString,
    fillOpacity: 0.7,
  });

  addPolygonEvent(
    polygon,
    () => {
      polygon.setZIndex(1);
      polygon.setOptions({ strokeColor: '#fff', fillOpacity: 1 });
    },
    () => {
      polygon.setZIndex(0);
      polygon.setOptions({ strokeColor: colorString, fillOpacity: 0.7 });
    },
  );

  return polygon;
};

const makeMultiPolygon = (
  coordsArray: [number, number][][][],
  colorString: string,
) => {
  const coordObjectsArray = coordsArray.map((coords: [number, number][][]) =>
    coords.map((coord: [number, number][]) =>
      coord.map((c: [number, number]) => new kakao.maps.LatLng(...c)),
    ),
  );

  const polygons = coordObjectsArray.map(
    (coordObjects) =>
      new kakao.maps.Polygon({
        path: coordObjects,
        strokeWeight: 2,
        strokeColor: colorString,
        strokeOpacity: 0.8,
        fillColor: colorString,
        fillOpacity: 0.7,
      }),
  );

  polygons.forEach((polygon) =>
    addPolygonEvent(
      polygon,
      () =>
        polygons.forEach((polygon) => {
          polygon.setOptions({ strokeColor: '#fff', fillOpacity: 1 });
          polygon.setZIndex(1);
        }),
      () =>
        polygons.forEach((polygon) => {
          polygon.setOptions({ strokeColor: colorString, fillOpacity: 0.7 });
          polygon.setZIndex(0);
        }),
    ),
  );

  return polygons;
};

const displayPolygons = (
  polygons: Array<kakao.maps.Polygon>,
  map: kakao.maps.Map,
) => {
  polygons.forEach((polygon) => polygon.setMap(map));
};

const deletePolygons = (polygons: Array<kakao.maps.Polygon>) => {
  polygons.forEach((polygon) => polygon.setMap(null));
};

const LFURegions = async (
  cache: Map<string, any>,
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
    cache.get(key).count++;
    return cache.get(key);
  } else {
    const regions = await requestCoord(scale, region);
    regions.count = 1;
    if (cache.size > 10) {
      const mostUnusedRegions = Array.from(cache.entries()).sort(
        (a, b) => a[1].count - b[1].count,
      )[0][0];

      cache.delete(mostUnusedRegions);
    }
    cache.set(key, regions);
    return regions;
  }
};

export {
  getCurrentLocation,
  coordToAddress,
  coordToRegionCode,
  requestCoord,
  isRangeEqual,
  createPolygons,
  displayPolygons,
  deletePolygons,
  LFURegions,
};
