import logger from '@loaders/loggerLoader';
import { Map, MapModel } from '@models/Map';
import { SimpleMap, SimpleMapModel } from '@models/SimpleMap';

import axios from 'axios';
import proj4 from 'proj4';
import simplify from 'simplify-js';

type CoordType = [number, number];

interface Point {
  x: number;
  y: number;
}

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

const getAuthToken = async () => {
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
      name: feature.properties.adm_nm,
      center: [lat, lng],
    };

    const simpleRegionData: SimpleMap = {
      codeLength: feature.properties.adm_cd.length,
      name: feature.properties.adm_nm,
      center: [lat, lng],
    };

    MapModel.create(regionData)
      .then(() => {
        logger.info(`insert -> ${regionData.name}`);
      })
      .catch((err) => {
        logger.error(err);
      });

    SimpleMapModel.create(simpleRegionData)
      .then(() => {
        logger.info(`insert -> ${simpleRegionData.name} -> simple`);
      })
      .catch((err) => {
        logger.error(err);
      });

    void recursiveGetCoords(feature.properties.adm_cd, accessToken);
  }
};

const populateMapAndSimpleMap = async () => {
  await MapModel.collection
    .drop()
    .then((result) => {
      logger.info('Dropped maps collection');
    })
    .catch((err) => {
      logger.error('Error! : ', err);
    });
  await SimpleMapModel.collection
    .drop()
    .then((result) => {
      logger.info('Dropped simpleMaps collection');
    })
    .catch((err) => {
      logger.error('Error! : ', err);
    });

  await MapModel.collection.createIndex({ codeLength: 1, name: 'text' });
  await SimpleMapModel.collection.createIndex({ codeLength: 1, name: 'text' });
  const accessToken = await getAuthToken();
  await recursiveGetCoords('', accessToken);
  logger.info('populate finish!');
};

export default { populateMapAndSimpleMap };
