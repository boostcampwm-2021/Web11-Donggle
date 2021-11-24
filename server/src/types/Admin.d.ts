import { Request } from 'express';

interface AdminRequest extends Request {
  body: {
    password?: string;
    type?: string;
  };
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

export { AdminRequest, CoordType, Point, FeatureType, CollectionType };
