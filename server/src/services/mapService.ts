import { Map, MapModel } from '@models/Map';

const queryPolygon = async (
  scale: number,
  big: string,
  medium: string,
  small: string,
) => {
  let result: Map[] = [];

  switch (true) {
    case scale < 6:
      result = await MapModel.find({
        name: { $regex: new RegExp(`^${big} ${medium}`) },
        code: { $regex: /^.......$/ },
      });
      break;
    case 6 <= scale && scale < 8:
      result = await MapModel.find({
        name: { $regex: new RegExp(`^${big}`) },
        code: { $regex: /^.....$/ },
      });
      break;
    case 9 <= scale:
      result = await MapModel.find({
        code: { $regex: /^..$/ },
      });
      break;
  }
  return result;
};

export default { queryPolygon };
