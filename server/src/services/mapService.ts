import { ClientSession } from 'mongoose';
import { Map as IMap, MapModel } from '@models/Map';
import { MapInfo, MapInfoModel } from '@models/MapInfo';
import { ReviewInsertData } from '@myTypes/Review';

import { FilterQuery } from 'mongoose';

const queryPolygon = async (
  address: string,
  scope: 'big' | 'medium' | 'small',
): Promise<IMap[]> => {
  let codeLength = 2;
  if (scope === 'big') codeLength = 2;
  else if (scope === 'medium') codeLength = 5;
  else if (scope === 'small') codeLength = 7;

  const query: FilterQuery<IMap> = {
    codeLength: codeLength,
  };
  if (scope !== 'big') query.$text = { $search: `"${address}"` };

  const result = await MapModel.find(query);
  return result;
};

const queryCenter = async (
  keyword: string,
  onlyDong: boolean,
  session: ClientSession | null = null,
): Promise<MapInfo[]> => {
  const query = onlyDong
    ? { address: { $regex: RegExp(keyword, 'g') }, codeLength: 7 }
    : { address: { $regex: RegExp(keyword, 'g') } };
  return await MapInfoModel.find(query).session(session);
};

const findTop5Hashtags = (hashtags: Map<string, number>) => {
  const candidates = hashtags.entries();
  return new Map([...candidates].sort((a, b) => b[1] - a[1]).slice(0, 5));
};

const queryRates = async (
  address: string,
  scope: 'big' | 'medium' | 'small',
) => {
  let codeLength = 2;
  if (scope === 'big') codeLength = 2;
  else if (scope === 'medium') codeLength = 5;
  else if (scope === 'small') codeLength = 7;

  const fields = {
    _id: 0,
    address: 1,
    code: 1,
    codeLength: 1,
    center: 1,
    count: 1,
    'categories.safety': 1,
    'categories.traffic': 1,
    'categories.food': 1,
    'categories.entertainment': 1,
    hashtags: true,
  };

  const query: FilterQuery<MapInfo> = {
    codeLength: codeLength,
  };
  if (scope !== 'big') query.$text = { $search: `"${address}"` };

  const result = await MapInfoModel.find(query, fields);
  result.forEach((r) => {
    if (!r.hashtags) {
      r.hashtags = new Map();
    } else {
      r.hashtags = findTop5Hashtags(r.hashtags);
    }
  });

  return result;
};

const updateRates = async (
  code: string,
  review: ReviewInsertData,
  session: ClientSession | undefined,
) => {
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
    { session: session },
  );
};

export default { queryPolygon, queryCenter, queryRates, updateRates };
