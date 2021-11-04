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
function coordToAddress(wtmX: number, wtmY: number) {
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
}

function coordToRegionCode(wtmX: number, wtmY: number) {
  const geocoder = new kakao.maps.services.Geocoder();
  const coord = new kakao.maps.LatLng(wtmX, wtmY);

  return new Promise((resolve, reject) => {
    geocoder.coord2RegionCode(
      coord.getLng(),
      coord.getLat(),
      function (result, status) {
        if (status === kakao.maps.services.Status.OK)
          resolve({ result: result[0].code, status });
        else reject({ result: NaN, status });
      },
    );
  });
}

// backend에 polygon 정보 요청
async function requestCoord(scale: number, regionCode: string) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/map/polygon?scale=${scale}&regionCode=${regionCode}`,
  ).then(async function (response) {
    console.log(await response.json());
    return response.json();
  });
}

function drawPolygon(map, regions) {
  const polygonInstances: Array<kakao.maps.Polygon> = [];
  regions.forEach((region) => {
    let polygon;
    if (region.type === 'Polygon') polygon = makeSinglePolygon(region.path);
    else polygon = makeMultiPolygon(region.path);

    polygon.setMap(map);
    polygonInstances.push(polygon);
  });

  return polygonInstances;
}

function makeSinglePolygon(coords: [number, number][]) {
  const coordObjects = coords.map(
    (coord: [number, number]) => new kakao.maps.LatLng(...coord),
  );

  return new kakao.maps.Polygon({
    path: coordObjects,
    strokeWeight: 2,
    strokeColor: '#004c80',
    strokeOpacity: 0.8,
    fillColor: '#fff',
    fillOpacity: 0.7,
  });
}

function makeMultiPolygon(coordsArray: [number, number][][]) {
  const coordObjects = coordsArray.map((coords: [number, number][]) => {
    return coords.map((coord: [number, number]) => {
      return new kakao.maps.LatLng(...coord);
    });
  });

  return new kakao.maps.Polygon({
    path: coordObjects,
    strokeWeight: 2,
    strokeColor: '#004c80',
    strokeOpacity: 0.8,
    fillColor: '#fff',
    fillOpacity: 0.7,
  });
}

function deletePolygon(polygonInstances: Array<kakao.maps.Polygon>) {
  polygonInstances.forEach((polygon) => {
    polygon.setMap(null);
  });
}

export {
  getCurrentLocation,
  coordToAddress,
  coordToRegionCode,
  requestCoord,
  drawPolygon,
  deletePolygon,
};
