import { rangeToLabel } from '@utils/address';
import useRates from '@hooks/useRates';
import { useState, useCallback, useMemo } from 'react';
import { IRankItem } from '@myTypes/Rank';
import { calcTotal } from '@utils/common';
import { IRange } from '@myTypes/Map';

const DEFAULT_CATEGORIES = {
  safety: 0,
  traffic: 0,
  food: 0,
  entertainment: 0,
};

const DEFAULT_BIG_LIST = [
  {
    label: '광역시 · 도',
    address: '',
    categories: {
      safety: NaN,
      traffic: NaN,
      food: NaN,
      entertainment: NaN,
    },
  },
];

const DEFAULT_MEDIUM_LIST = [
  {
    label: '시 · 군 · 구',
    address: '',
    categories: {
      safety: NaN,
      traffic: NaN,
      food: NaN,
      entertainment: NaN,
    },
  },
];

const sortRankItems = (rankItems: IRankItem[]) => {
  const items = [...rankItems];
  return items.sort((a, b) => {
    const totalA = calcTotal(a.categories) || 0;
    const totalB = calcTotal(b.categories) || 0;
    return totalB - totalA;
  });
};

const useRankItems = (address: string, scope: 'big' | 'medium' | 'small') => {
  const { rates } = useRates({ address, scope });
  const rankItems = useMemo(() => {
    if (!rates) return [];

    const rankItems = rates.map((rate) => {
      const categories = { ...DEFAULT_CATEGORIES };
      Object.keys(rate.categories).forEach((category) => {
        categories[category] = rate.categories[category] / rate.count;
      });

      return {
        label: rangeToLabel(rate.address, scope),
        address: rate.address,
        categories: categories,
      };
    });

    return rankItems.sort((a, b) => a.label.localeCompare(b.label));
  }, [rates, scope]);

  return rankItems;
};

const useRanks = () => {
  const bigRankItems = useRankItems('', 'big');
  const bigList = useMemo(
    () => [...DEFAULT_BIG_LIST, ...bigRankItems],
    [bigRankItems],
  );
  const [bigIdx, setBigIdx] = useState(0);

  const mediumRankItems = useRankItems(
    bigIdx > 0 ? bigList[bigIdx].address : '',
    'medium',
  );
  const mediumList = useMemo(
    () => [...DEFAULT_MEDIUM_LIST, ...mediumRankItems],
    [mediumRankItems],
  );
  const [, setMediumIdx] = useState(0);

  const [{ address, scope }, setRankRange] = useState<IRange>({
    address: '',
    scope: 'big',
  });
  const rankList = sortRankItems(useRankItems(address, scope));

  const onBigSelected = useCallback(
    (idx: number) => {
      setBigIdx(idx);
      setMediumIdx(0);
      if (idx === 0) {
        setRankRange({ address: '', scope: 'big' });
      } else {
        setRankRange({ address: bigList[idx].address, scope: 'medium' });
      }
    },
    [bigList],
  );

  const onMediumSelected = useCallback(
    (idx: number) => {
      setMediumIdx(idx);
      if (idx === 0) {
        setRankRange({ address: bigList[bigIdx].address, scope: 'medium' });
      } else {
        setRankRange({ address: mediumList[idx].address, scope: 'small' });
      }
    },
    [bigList, bigIdx, mediumList],
  );

  return {
    bigList,
    bigIdx,
    mediumList,
    rankList,
    onBigSelected,
    onMediumSelected,
  };
};

export default useRanks;
