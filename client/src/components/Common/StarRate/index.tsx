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
  total: number;
}

const StarRateDiv: React.FC<IProps> = ({ isLarge, total }) => {
  return (
    <RateNumStarDiv>
      <RateSpanText isLarge={isLarge}>{total}</RateSpanText>
      <RateStarDiv>
        <RateStarFillDiv rate={total}>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </RateStarFillDiv>
        <RateStarBaseDiv>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </RateStarBaseDiv>
      </RateStarDiv>
    </RateNumStarDiv>
  );
};

export default StarRateDiv;
