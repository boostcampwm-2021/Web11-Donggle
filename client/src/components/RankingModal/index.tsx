import Modal from '@components/Common/Modal';
import Rankbar from './Rankbar';
import Selector from './Selector';
import { RankbarList, SelectorWrapper, TitleText } from './index.style';
import { ReactComponent as RankIcon } from '@assets/icons/ranking.svg';

import React, { useState, useCallback, useEffect } from 'react';

const SAMPLE_BIG_LIST = [
  {
    label: '서울특별시',
    address: '서울특별시',
    categories: {
      safety: 5,
      traffic: 5,
      food: 5,
      entertainment: 5,
    },
  },
  {
    label: '경기도',
    address: '경기도',
    categories: {
      safety: 5,
      traffic: 5,
      food: 5,
      entertainment: 4.5,
    },
  },
  {
    label: '강원도',
    address: '강원도',
    categories: {
      safety: 4,
      traffic: 4,
      food: 4,
      entertainment: 4,
    },
  },
];

const SAMPLE_MEDIUM_LIST = [
  {
    label: '도봉구',
    address: '서울특별시 도봉구',
    categories: {
      safety: 4.3,
      traffic: 2.5,
      food: 3.3,
      entertainment: 3.2,
    },
  },
  {
    label: '노원구',
    address: '서울특별시 노원구',
    categories: {
      safety: 4.4,
      traffic: 2.6,
      food: 3.4,
      entertainment: 3.3,
    },
  },
  {
    label: '동대문구',
    address: '서울특별시 동대문구',
    categories: {
      safety: 4.5,
      traffic: 2.6,
      food: 3.5,
      entertainment: 3.4,
    },
  },
  {
    label: '중랑구',
    address: '서울특별시 중랑구',
    categories: {
      safety: 4.2,
      traffic: 2.4,
      food: 3.2,
      entertainment: 3.1,
    },
  },
  {
    label: '강서구',
    address: '서울특별시 강서구',
    categories: {
      safety: 4.1,
      traffic: 2.3,
      food: 3.1,
      entertainment: 3,
    },
  },
  {
    label: '강남구',
    address: '서울특별시 강남구',
    categories: {
      safety: 3.9,
      traffic: 2.2,
      food: 3,
      entertainment: 2.9,
    },
  },
  {
    label: '마포구',
    address: '서울특별시 마포구',
    categories: {
      safety: 4.8,
      traffic: 4.6,
      food: 3.1,
      entertainment: 3.4,
    },
  },
  {
    label: '중구',
    address: '서울특별시 중구',
    categories: {
      safety: 1.2,
      traffic: 2.3,
      food: 1.8,
      entertainment: 1.3,
    },
  },
  {
    label: '용산구',
    address: '서울특별시 용산구',
    categories: {
      safety: 1.1,
      traffic: 4.5,
      food: 4.9,
      entertainment: 4.8,
    },
  },
];

const SAMPLE_SMALL_LIST = [
  {
    label: '녹양동',
    address: '경기도 의정부시 녹양동',
    categories: {
      safety: 4.3,
      traffic: 2.5,
      food: 3.3,
      entertainment: 3.2,
    },
  },
  {
    label: '호원동',
    address: '경기도 의정부시 호원동',
    categories: {
      safety: 4.4,
      traffic: 2.6,
      food: 3.4,
      entertainment: 3.3,
    },
  },
  {
    label: '가능동',
    address: '경기도 의정부시 가능동',
    categories: {
      safety: 4.5,
      traffic: 2.6,
      food: 3.5,
      entertainment: 3.4,
    },
  },
];

interface IRankItem {
  label: string;
  address: string;
  categories: {
    safety: number;
    traffic: number;
    food: number;
    entertainment: number;
  };
}

const DEFAULT_BIG_LIST = [
  {
    label: '광역시·도',
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
    label: '시·군·구',
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
        // const address = bigList[idx].address;
        // const newMediumList = await requestMediumRegions(address);
        // setMediumList([...DEFAULT_MEDIUM_LIST, ...newMediumList]);
        // newRankList = newMediumList;

        // setMediumList([...DEFAULT_MEDIUM_LIST, ...SAMPLE_MEDIUM_LIST]);
        setTimeout(
          () => setMediumList([...DEFAULT_MEDIUM_LIST, ...SAMPLE_MEDIUM_LIST]),
          100,
        );
        newRankList = SAMPLE_MEDIUM_LIST;
      }
      setRankList(newRankList);
    },
    [bigList],
  );

  const onMediumSelected = useCallback(
    async (idx: number) => {
      let newRankList = Array<IRankItem>();
      if (idx === 0) {
        newRankList = mediumList.slice(1);
      } else {
        // const address = mediumList[idx].address;
        // newRankList = await requestSmallRegions(address);
        newRankList = SAMPLE_SMALL_LIST;
      }
      setRankList(newRankList);
    },
    [mediumList],
  );

  useEffect(() => {
    const updateBigList = async () => {
      // const newBigList = await requestBigRegions();
      // setBigList([...DEFAULT_BIG_LIST, ...newBigList]);
      setBigList([...DEFAULT_BIG_LIST, ...SAMPLE_BIG_LIST]);
      setRankList(SAMPLE_BIG_LIST);
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
        {rankList.map(({ label, categories }, idx) => (
          <Rankbar
            key={idx}
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
