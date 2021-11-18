import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import {
  RateNumStarDiv,
  RateSpanText,
  RateStarDiv,
  RateStarBaseDiv,
  RateStarFillDiv,
} from './index.style';

interface IProps {
  isLarge: boolean;
  total: string;
}

const StarRateDiv: React.FC<IProps> = ({ isLarge, total }) => {
  const faIconList = Array.from({ length: 5 }, (_, index) => index + 1).map(
    (n) => {
      return <FontAwesomeIcon key={n} icon={faStar} />;
    },
  );
  return (
    <RateNumStarDiv>
      <RateSpanText isLarge={isLarge}>
        {isNaN(Number(total)) ? 'N/A' : total}
      </RateSpanText>
      <RateStarDiv>
        <RateStarFillDiv rate={Number(total) || 0}>
          {faIconList}
        </RateStarFillDiv>
        <RateStarBaseDiv>{faIconList}</RateStarBaseDiv>
      </RateStarDiv>
    </RateNumStarDiv>
  );
};

export default StarRateDiv;
