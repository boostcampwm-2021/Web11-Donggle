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

  interface MapInfo {
    address: string;
    code: string;
    codeLength: number;
    center: CoordType;
    //현재는 리뷰 정보가 없으므로 require를 false로함
    rate?: Rate;
  }

  interface Rate {
    count: number;
    total: number;
    safety: number;
    traffic: number;
    food: number;
    entertainment: number;
  }
}

export {};
