import { Map, MapModel } from '@models/Map';
import { SimpleMap, SimpleMapModel } from '@models/SimpleMap';

const queryPolygon = async (
  scale: number,
  big: string,
  medium: string,
  small: string,
): Promise<Map[]> => {
  let result: Map[] = [];

  switch (true) {
    case scale < 9:
      result = await MapModel.find({
        $text: { $search: `${medium}` },
        codeLength: 7,
      });
      break;
    case 9 <= scale && scale < 12:
      result = await MapModel.find({
        $text: { $search: `${big}` },
        codeLength: 5,
      });
      break;
    case 12 <= scale:
      result = await MapModel.find({
        codeLength: 2,
      });
      break;
  }
  return result;
};

const queryCenter = async (keyword: string): Promise<SimpleMap[]> => {
  return await SimpleMapModel.find({ name: { $regex: RegExp(keyword, 'g') } });
};

export default { queryPolygon, queryCenter };
