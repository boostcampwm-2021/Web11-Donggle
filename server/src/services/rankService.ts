import { MapInfo, MapInfoModel } from '@models/MapInfo';
import { FilterQuery } from 'mongoose';

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
    count: 1,
    'categories.safety': 1,
    'categories.traffic': 1,
    'categories.food': 1,
    'categories.entertainment': 1,
  };

  const query: FilterQuery<MapInfo> = {
    codeLength: codeLength,
  };
  if (scope !== 'big') query.$text = { $search: `"${address}"` };

  const rates = await MapInfoModel.find(query, fields);
  return rates;
};

export default { queryRates };
