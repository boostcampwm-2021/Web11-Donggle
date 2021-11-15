declare global {
  type APIResultType<T> = {
    result: T;
    message: string;
  };

  type CoordType = [number, number];

  interface Region {
    address: string;
    path: CoordType[] | CoordType[][][];
    code: string;
    codeLength: number;
    center: [number, number];
    type: 'Polygon' | 'MultiPolygon';
  }

  interface CategoryRateType {
    categories: {
      safety: number;
      traffic: number;
      food: number;
      entertainment: number;
    };
  }
  interface RateType extends CategoryRateType {
    address: string;
    code: string;
    codeLength: number;
    center: [number, number];
    total: number;
    count: number;
  }

  interface ReviewType extends CategoryRateType {
    text: string;
    user: string;
  }
}
export {};
