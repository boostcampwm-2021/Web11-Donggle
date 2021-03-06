import ColorHash from 'color-hash';
import { CoordType, IMap, IPolygon, IRange } from '@myTypes/Map';

function getCurrentLocation(callback: (coord: CoordType) => void): void {
  let coord: CoordType = [37.5642135, 127.0016985];

  const successCallback: PositionCallback = (position) => {
    const { latitude, longitude } = position.coords;
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

const coordToRegion = (
  latitude: number,
  longitude: number,
): Promise<unknown> => {
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

const isRangeEqual = (range1: IRange, range2: IRange): boolean => {
  if (range1.scope !== range2.scope) return false;
  if (range1.address !== range2.address) return false;
  return true;
};

const createPolygons = (regions: IMap[]): IPolygon[] => {
  const polygons = Array<IPolygon>();
  const colorHash = new ColorHash();
  const keyString = '!@#$';
  let resultString = '';
  regions.forEach((region) => {
    const color: string = colorHash.hex(resultString);
    resultString += keyString;
    if (region.type === 'Polygon') {
      polygons.push(
        makeSinglePolygon(region.path as CoordType[], region.address, color),
      );
    } else {
      polygons.push(
        ...makeMultiPolygon(
          region.path as CoordType[][][],
          region.address,
          color,
        ),
      );
    }
  });
  return polygons;
};

const addPolygonClickEvent = (polygon: IPolygon, onClick: () => void): void => {
  if (polygon.onClick) {
    kakao.maps.event.removeListener(polygon, 'click', polygon.onClick);
  }
  polygon.onClick = onClick;
  kakao.maps.event.addListener(polygon, 'click', onClick);
};

const removePolygonClickEvent = (polygon: IPolygon): void => {
  if (polygon.onClick) {
    kakao.maps.event.removeListener(polygon, 'click', polygon.onClick);
  }
  polygon.onClick = undefined;
};

const addPolygonEvent = (
  polygon: kakao.maps.Polygon,
  callbackIn: () => void,
  callbackOut: () => void,
): void => {
  kakao.maps.event.addListener(polygon, 'mouseover', callbackIn);
  kakao.maps.event.addListener(polygon, 'mouseout', callbackOut);
};

const polygonOptions: kakao.maps.PolygonOptions = {
  strokeWeight: 2,
  strokeColor: '#004c80',
  strokeOpacity: 0.8,
  fillColor: '#fff',
  fillOpacity: 0.7,
};

const makeSinglePolygon = (
  coords: [number, number][],
  address: string,
  colorString: string,
): IPolygon => {
  const coordObjects = coords.map(
    (coord: [number, number]) => new kakao.maps.LatLng(...coord),
  );

  const polygon = new kakao.maps.Polygon({
    ...polygonOptions,
    path: coordObjects,
    strokeColor: colorString,
    fillColor: colorString,
  }) as IPolygon;

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

  polygon.address = address;
  return polygon;
};

const makeMultiPolygon = (
  coordsArray: [number, number][][][],
  address: string,
  colorString: string,
): IPolygon[] => {
  const coordObjectsArray = coordsArray.map((coords: [number, number][][]) =>
    coords.map((coord: [number, number][]) =>
      coord.map((c: [number, number]) => new kakao.maps.LatLng(...c)),
    ),
  );

  const polygons = coordObjectsArray.map(
    (coordObjects) =>
      new kakao.maps.Polygon({
        ...polygonOptions,
        path: coordObjects,
        strokeColor: colorString,
        fillColor: colorString,
      }) as IPolygon,
  );

  polygons.forEach((polygon) => {
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
    );
    polygon.address = address;
  });

  return polygons;
};

const displayPolygons = (
  polygons: Array<kakao.maps.Polygon>,
  map: kakao.maps.Map,
): void => {
  polygons.forEach((polygon) => polygon.setMap(map));
};

const deletePolygons = (polygons: Array<kakao.maps.Polygon>): void => {
  polygons.forEach((polygon) => polygon.setMap(null));
};

export {
  getCurrentLocation,
  coordToRegion,
  isRangeEqual,
  createPolygons,
  displayPolygons,
  deletePolygons,
  addPolygonClickEvent,
  removePolygonClickEvent,
};
