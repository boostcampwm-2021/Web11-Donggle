import { Map, MapModel } from '@models/Map';

const queryPolygon = async (
  scale: number,
  big: string,
  medium: string,
  small: string,
) => {
  let result: Map[] = [];

  switch (true) {
    case scale < 9:
      result = await MapModel.find({
        name: { $regex: new RegExp(`^${big} ${medium}`) },
        code: { $regex: /^.......$/ },
      });
      break;
    case 9 <= scale && scale < 12:
      result = await MapModel.find({
        name: { $regex: new RegExp(`^${big}`) },
        code: { $regex: /^.....$/ },
      });
      break;
    case 12 <= scale:
      result = await MapModel.find({
        code: { $regex: /^..$/ },
      });
      break;
  }
  return result;
};

export default { queryPolygon };
