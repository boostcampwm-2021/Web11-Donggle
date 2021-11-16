import { ICategories } from './Review';

type CoordType = [number, number];

interface IMap {
  address: string;
  path: CoordType[] | CoordType[][][];
  code: string;
  codeLength: number;
  center: [number, number];
  type: 'Polygon' | 'MultiPolygon';
}

interface IMapInfo {
  address: string;
  code: string;
  codeLength: number;
  center: CoordType;
  count: number;
  //현재는 리뷰 정보가 없으므로 require를 false로함
  categories: ICategories;
}

interface IPolygon extends kakao.maps.Polygon {
  address: string;
  onClick?: () => void;
}

export { IMap, IMapInfo, IPolygon };
export type { CoordType };
