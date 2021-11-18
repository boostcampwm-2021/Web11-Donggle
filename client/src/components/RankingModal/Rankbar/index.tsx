import { RankbarDiv, RankSpan, BarLayout } from './index.style';
import { ICategories } from '@myTypes/Review';
import { calcTotal } from '@utils/common';
import StarRateDiv from '@components/Common/StarRate';
import BarRateDiv from '@components/Common/BarRate';
import CircleRate from '@components/Common/CircleRate';

import React, { useState, useCallback, useMemo } from 'react';

interface IDetailedProps {
  total: number;
  categories: ICategories;
}

interface IRankbarProps {
  rank: number;
  address: string;
  categories: ICategories;
}

const DetailedRankbar: React.FC<IDetailedProps> = ({ total, categories }) => {
  return (
    <BarLayout>
      <CircleRate width="40%" rate={total} />
      <BarRateDiv count={1} categories={categories} />
    </BarLayout>
  );
};

const Rankbar: React.FC<IRankbarProps> = ({ rank, address, categories }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = useCallback(() => setShowDetails((prev) => !prev), []);
  const totalRate = useMemo(() => calcTotal(categories), [categories]);

  return (
    <div>
      <RankbarDiv onClick={toggleDetails}>
        <RankSpan>{rank}</RankSpan>
        <span>{address}</span>
        <div>
          <StarRateDiv isLarge={false} total={totalRate.toFixed(1)} />
        </div>
      </RankbarDiv>
      {showDetails && (
        <DetailedRankbar total={totalRate} categories={categories} />
      )}
    </div>
  );
};

export default Rankbar;
