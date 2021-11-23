import Modal from '@components/Common/Modal';
import Rankbar from './Rankbar';
import Selector from './Selector';
import { RankbarList, SelectorWrapper, TitleText } from './index.style';
import { ReactComponent as RankIcon } from '@assets/icons/ranking.svg';
import useRanks from '@hooks/useRanks';

import React from 'react';

const RankingModal: React.FC = () => {
  const {
    bigList,
    bigIdx,
    mediumList,
    rankList,
    onBigSelected,
    onMediumSelected,
  } = useRanks();

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
          dependingState={0}
          disabled={false}
        />
        <Selector
          labels={mediumList.map((data) => data.label)}
          onSelected={onMediumSelected}
          dependingState={bigIdx}
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
