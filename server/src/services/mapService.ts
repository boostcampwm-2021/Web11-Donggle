import { Map, MapModel } from '@models/Map';
import { MapInfo, MapInfoModel } from '@models/MapInfo';
import { ReviewInsertData } from '@myTypes/Review';

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
        /*
        2921-11-10
        홍승용
        형태소가 아닌 문장을 쿼리하려면 escape 해야함
        */
        // eslint-disable-next-line no-useless-escape
        $text: { $search: `\"${big} ${medium}\"` },
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

const queryCenter = async (keyword: string): Promise<MapInfo[]> => {
  return await MapInfoModel.find({ address: { $regex: RegExp(keyword, 'g') } });
};

const queryRates = async (
  scale: number,
  big: string,
  medium: string,
  small: string,
) => {
  let result: MapInfo[] = [];
  const fields = {
    _id: 0,
    address: 1,
    code: 1,
    codeLength: 1,
    center: 1,
    count: 1,
    categories: {
      safety: '$categories.safety',
      traffic: '$categories.traffic',
      food: '$categories.food',
      entertainment: '$categories.entertainment',
    },
  };

  switch (true) {
    case scale < 9:
      result = await MapInfoModel.find(
        {
          $text: { $search: `"${big} ${medium}"` },
          codeLength: 7,
        },
        fields,
      );
      break;
    case 9 <= scale && scale < 12:
      result = await MapInfoModel.find(
        {
          $text: { $search: `${big}` },
          codeLength: 5,
        },
        fields,
      );
      break;
    case 12 <= scale:
      result = await MapInfoModel.find(
        {
          codeLength: 2,
        },
        fields,
      );
      break;
  }
  return result;
};

const updateRates = async (code: string, review: ReviewInsertData) => {
  const conditions = [
    { codeLength: 2, code: code.slice(0, 2) },
    { codeLength: 5, code: code.slice(0, 5) },
    { codeLength: 7, code: code },
  ];

  const increment = {
    count: 1,
    'categories.safety': review.categories.safety,
    'categories.traffic': review.categories.traffic,
    'categories.food': review.categories.food,
    'categories.entertainment': review.categories.entertainment,
  };

  await MapInfoModel.updateMany(
    { $or: conditions },
    {
      $inc: increment,
    },
  );
};
export default { queryPolygon, queryCenter, queryRates, updateRates };
