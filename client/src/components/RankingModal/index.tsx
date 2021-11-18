import Modal from '@components/Common/Modal';
import Rankbar from './Rankbar';
import Selector from './Selector';
import { RankbarList, SelectorWrapper, TitleText } from './index.style';
import { ReactComponent as RankIcon } from '@assets/icons/ranking.svg';
import { IRankItem } from '@myTypes/Rank';
import { getRankItems, sortRankItems } from '@controllers/rankController';

import React, { useState, useCallback, useEffect } from 'react';

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

const RankingModal: React.FC = () => {
  const [bigList, setBigList] = useState(DEFAULT_BIG_LIST);
  const [mediumList, setMediumList] = useState(DEFAULT_MEDIUM_LIST);
  const [rankList, setRankList] = useState<IRankItem[]>([]);

  const onBigSelected = useCallback(
    async (idx: number) => {
      setMediumList(DEFAULT_MEDIUM_LIST);

      let newRankList = Array<IRankItem>();
      if (idx === 0) {
        newRankList = bigList.slice(1);
      } else {
        const address = bigList[idx].address;
        const newMediumList = await getRankItems(address, 'medium');
        setMediumList([...DEFAULT_MEDIUM_LIST, ...newMediumList]);
        newRankList = newMediumList;
      }
      setRankList(sortRankItems(newRankList));
    },
    [bigList],
  );

  const onMediumSelected = useCallback(
    async (idx: number) => {
      let newRankList = Array<IRankItem>();
      if (idx === 0) {
        newRankList = mediumList.slice(1);
      } else {
        const address = mediumList[idx].address;
        newRankList = await getRankItems(address, 'small');
      }
      setRankList(sortRankItems(newRankList));
    },
    [mediumList],
  );

  useEffect(() => {
    const updateBigList = async () => {
      const newBigList = await getRankItems('', 'big');
      setBigList([...DEFAULT_BIG_LIST, ...newBigList]);
      setRankList(sortRankItems(newBigList));
    };
    updateBigList();
  }, []);

  return (
    <Modal>
      <TitleText>
        <RankIcon height="30px" />
        <span>동네별 랭킹</span>
      </TitleText>
      <SelectorWrapper>
        <Selector
          labels={bigList.map((data) => data.label)}
          onSelected={onBigSelected}
          disabled={false}
        />
        <Selector
          labels={mediumList.map((data) => data.label)}
          onSelected={onMediumSelected}
          disabled={mediumList.length <= 1}
        />
      </SelectorWrapper>
      <RankbarList>
        {rankList.map(({ label, categories, address }, idx) => (
          <Rankbar
            key={address}
            rank={idx + 1}
            address={label}
            categories={categories}
          />
        ))}
      </RankbarList>
    </Modal>
  );
};

export default RankingModal;
