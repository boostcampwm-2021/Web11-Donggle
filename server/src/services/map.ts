import { MapModel } from '@models/Map';

interface RegionCode {
  big: string;
  medium: string;
  small: string;
}

const parseCode = (code: string): RegionCode => {
  const big = code.slice(0, 2);
  const medium = code.slice(0, 5);
  const small = code.slice(0, 7);
  return {
    big,
    medium,
    small,
  };
};

const queryPolygon = async (scale: number, regionCode: RegionCode) => {
  let result: any;

  switch (true) {
    case scale < 6:
      result = await MapModel.find({
        code: { $regex: new RegExp(`^${regionCode.medium}..$`) },
      });
      break;
    case 6 <= scale && scale < 8:
      result = await MapModel.find({
        code: { $regex: new RegExp(`^${regionCode.big}...$`) },
      });
      break;
    case 9 <= scale:
      result = await MapModel.find({
        code: { $regex: new RegExp(`^..$`) },
      });
      break;
  }
  return result;
};

export { parseCode, queryPolygon };
