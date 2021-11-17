import { IAPIResult } from '@myTypes/Common';
import { IRankItem, IRankRate } from '@myTypes/Rank';
import { calcTotal } from '@utils/common';

const requestRates = async (
  address: string,
  scope: 'big' | 'medium' | 'small',
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/rank?address=${address}&scope=${scope}`,
    );
    const apiResult: IAPIResult<IRankRate[] | Record<string, never>> =
      await response.json();
    if (response.status !== 200) {
      throw Error('랭킹 정보를 불러오는데 실패했습니다.');
    }
    return apiResult.result as IRankRate[];
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    return [];
  }
};

const DEFAULT_CATEGORIES = {
  safety: 0,
  traffic: 0,
  food: 0,
  entertainment: 0,
};

const sortRankItems = (rankItems: IRankItem[]) => {
  const items = [...rankItems];
  return items.sort((a, b) => {
    const totalA = calcTotal(a.categories) || 0;
    const totalB = calcTotal(b.categories) || 0;
    return totalB - totalA;
  });
};

const addressToLabel = (address: string, scope: 'big' | 'medium' | 'small') => {
  if (scope === 'big') return address;
  if (scope === 'medium') return address.split(' ').slice(1).join(' ');
  const tokens = address.split(' ');
  return tokens[tokens.length - 1];
};

const getRankItems = async (
  address: string,
  scope: 'big' | 'medium' | 'small',
) => {
  const rates = await requestRates(address, scope);
  const rankItems = rates.map((rate) => {
    const categories = { ...DEFAULT_CATEGORIES };
    Object.keys(rate.categories).forEach((category) => {
      categories[category] = rate.categories[category] / rate.count;
    });
    return {
      label: addressToLabel(rate.address, scope),
      address: rate.address,
      categories: categories,
    };
  });
  return rankItems.sort((a, b) => a.label.localeCompare(b.label));
};

export { getRankItems, sortRankItems };
