import { Request } from 'express';

interface MapRequest extends Request {
  body: { password?: string };
}

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

export { MapRequest, CoordType, Point, FeatureType, CollectionType };
