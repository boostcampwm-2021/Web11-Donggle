import logger from '@loaders/loggerLoader';
import { MapModel } from '@models/index';
import axios from 'axios';
import fs from 'fs';
import proj4 from 'proj4';
import path from 'path';

interface ChangedCoords {
  name: string;
  path: Array<[number, number]>;
}

type CoordType = [number, number];

interface FeatureType {
  type: string;
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: CoordType[][] | CoordType[][][];
  };
  properties: {
    adm_cd: string;
    adm_nm: string;
    x: string;
    y: string;
  };
}

interface CollectionType {
  type: string;
  id: string;
  errMsg: string;
  errCd: number;
  trId: string;
  features: FeatureType[];
}

interface RegionType {
  name: string;
  path: CoordType[] | CoordType[][];
  code: string;
  center: CoordType;
  type: 'Polygon' | 'MultiPolygon';
  children: RegionType[];
}

interface ChangedCoords {
  name: string;
  path: Array<[number, number]>;
}

async function getAuthToken() {
  const url = `https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=${
    process.env.KOSIS_CONSUMER_KEY as string
  }&consumer_secret=${process.env.KOSIS_CONSUMER_SECRET as string}`;
  const token = await axios
    .request<{ result: { accessToken: string } }>({
      url: url,
      method: 'get',
    })
    .then((res) => res.data.result.accessToken);

  return token;
}

async function getDistrictCoord(code: string, accessToken: string) {
  const year: number = new Date().getFullYear();
  const url = `https://sgisapi.kostat.go.kr/OpenAPI3/boundary/hadmarea.geojson?accessToken=${accessToken}&year=${year}&${
    code !== '' ? `&adm_cd=${code}` : ''
  }`;

  const collection = await axios
    .request<CollectionType>({
      url: url,
      method: 'get',
    })
    .then((res) => res.data)
    .catch(
      (err) =>
        ({
          type: '',
          id: '',
          errMsg: 'ERROR!',
          errCd: 0,
          trId: '',
          features: Array<FeatureType>(),
        } as CollectionType),
    );

  return collection;
}

function transCoord(coord: CoordType): CoordType {
  const wgs84 =
    '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees';
  const grs80 =
    '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs';

  const [lng, lat] = proj4(grs80, wgs84, coord);
  return [lat, lng];
}

function transPolygon(path: CoordType[]) {
  return path.map((coord) => transCoord(coord));
}

function transMultiPolygon(path: CoordType[][]) {
  return path.map((coords) => coords.map((coord) => transCoord(coord)));
}

async function recursiveGetCoords(code: string, accessToken: string) {
  if (code.length >= 7) {
    return null;
  }
  const collection: CollectionType = await getDistrictCoord(code, accessToken);

  const regions = Array<RegionType>();

  for (const feature of collection.features) {
    console.log(feature.properties.adm_nm);
    const [lat, lng] = transCoord([
      Number(feature.properties.x),
      Number(feature.properties.y),
    ]);

    let path: CoordType[] | CoordType[][];
    if (feature.geometry.type === 'Polygon') {
      path = transPolygon(feature.geometry.coordinates[0] as CoordType[]);
    } else {
      path = transMultiPolygon(
        feature.geometry.coordinates[0] as CoordType[][],
      );
    }

    const regionData: RegionType = {
      type: feature.geometry.type,
      path,
      code: feature.properties.adm_cd,
      name: feature.properties.adm_nm,
      center: [lat, lng],
      children: Array<RegionType>(),
    };

    const coordsData = await recursiveGetCoords(
      feature.properties.adm_cd,
      accessToken,
    );
    if (coordsData !== null) regionData.children.push(...coordsData);
    regions.push(regionData);
  }

  return regions;
}

async function testRecursive() {
  const accessToken = await getAuthToken();
  const regionList = await recursiveGetCoords('', accessToken);
  fs.writeFileSync(
    path.resolve() + '/test.json',
    JSON.stringify(regionList, null, 2),
  );
}

export default testRecursive;
