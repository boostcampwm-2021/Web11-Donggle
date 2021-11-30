import logger from '@loaders/loggerLoader';
import config from 'configs/index';
import { Map, MapModel } from '@models/Map';
import { MapInfo, MapInfoModel } from '@models/MapInfo';
import { CoordType, Point, FeatureType, CollectionType } from '@myTypes/Admin';

import axios from 'axios';
import proj4 from 'proj4';
import simplify from 'simplify-js';

const getAuthToken = async () => {
  const url = `https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=${config.kosis_consumer_key}&consumer_secret=${config.kosis_consumer_secret}`;
  const token = await axios
    .request<{ result: { accessToken: string } }>({
      url: url,
      method: 'get',
    })
    .then((res) => res.data.result.accessToken);

  return token;
};

const getDistrictCoord = async (code: string, accessToken: string) => {
  const year: number = new Date().getFullYear();
  const url = `https://sgisapi.kostat.go.kr/OpenAPI3/boundary/hadmarea.geojson?accessToken=${accessToken}&year=${year}&${
    code !== '' ? `&adm_cd=${code}` : ''
  }`;

  const collection = await axios
    .request<CollectionType>({
      url: url,
      method: 'get',
    })
    .then((res) => res.data);

  return collection;
};

function transCoord(coord: CoordType): CoordType {
  const wgs84 =
    '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees';
  const grs80 =
    '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs';

  const [lng, lat] = proj4(grs80, wgs84, coord);
  return [lat, lng];
}

const transPolygon = (path: CoordType[]) => {
  const simplifiedPath: Point[] = simplify(
    path.map((coord) => ({ x: coord[0], y: coord[1] } as Point)),
    5,
    true,
  );
  return simplifiedPath.map((coord) =>
    transCoord(Object.values(coord) as CoordType),
  );
};

const transMultiPolygon = (path: CoordType[][][]) => {
  return path.map((coords) => coords.map((coord) => transPolygon(coord)));
};

const recursiveGetCoords = async (code: string, accessToken: string) => {
  if (code.length >= 7) {
    return null;
  }
  const collection: CollectionType = await getDistrictCoord(code, accessToken);

  for (const feature of collection.features) {
    const [lat, lng] = transCoord([
      Number(feature.properties.x),
      Number(feature.properties.y),
    ]);

    let path: CoordType[] | CoordType[][][];
    if (feature.geometry.type === 'Polygon') {
      path = transPolygon(feature.geometry.coordinates[0] as CoordType[]);
    } else {
      path = transMultiPolygon(feature.geometry.coordinates as CoordType[][][]);
    }

    const regionData: Map = {
      type: feature.geometry.type,
      path,
      code: feature.properties.adm_cd,
      codeLength: feature.properties.adm_cd.length,
      address: feature.properties.adm_nm,
      center: [lat, lng],
    };

    const mapInfoData: MapInfo = {
      codeLength: feature.properties.adm_cd.length,
      code: feature.properties.adm_cd,
      address: feature.properties.adm_nm,
      center: [lat, lng],
      count: 0,
      categories: {
        safety: 0,
        traffic: 0,
        food: 0,
        entertainment: 0,
      },
      hashtags: new Map(),
    };

    void MapModel.create(regionData).then(() => {
      logger.info(`insert -> ${regionData.address}`);
    });

    void MapInfoModel.create(mapInfoData).then(() => {
      logger.info(`insert -> ${mapInfoData.address} -> mapInfo`);
    });

    void recursiveGetCoords(feature.properties.adm_cd, accessToken);
  }
};

const populateMapAndSimpleMap = async (): Promise<void> => {
  await MapModel.collection.drop().then((result) => {
    logger.info('Dropped maps collection');
  });

  //MapInfo는 업데이트 / 삭제 추후 결정
  await MapInfoModel.collection.drop().then((result) => {
    logger.info('Dropped mapInfos collection');
  });

  await MapModel.collection.createIndex({ codeLength: 1, address: 'text' });
  await MapInfoModel.collection.createIndex({ codeLength: 1, address: 'text' });
  const accessToken = await getAuthToken();
  await recursiveGetCoords('', accessToken);
};

const random = (from: number, to: number) => {
  return Number((Math.random() * (to - from) + from).toFixed(2));
};

const getRandomRate = () => {
  return random(1, 5);
};

const populateMapInfos = async () => {
  (await MapInfoModel.find({})).forEach((doc) => {
    const count = Math.floor(random(0, 100));
    const safety = Math.floor(getRandomRate() * count);
    const traffic = Math.floor(getRandomRate() * count);
    const food = Math.floor(getRandomRate() * count);
    const entertainment = Math.floor(getRandomRate() * count);
    const categories = {
      safety,
      traffic,
      food,
      entertainment,
    };
    void doc
      .updateOne({ count, categories })
      .then(() => logger.info(`${doc.address} -> mapInfo rate`));
  });
};

export default { populateMapAndSimpleMap, populateMapInfos };
