import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import {
  RateStarDiv,
  CategorySpanDiv,
  CategorySpan,
  StarRateDiv,
} from './index.style';

const DynamicStarRateDiv: React.FC<{ category: string }> = ({ category }) => {
  return (
    <RateStarDiv>
      <CategorySpanDiv>
        <CategorySpan>{category}</CategorySpan>
      </CategorySpanDiv>
      <StarRateDiv>
        <FontAwesomeIcon icon={faStar} size="lg" />
        <FontAwesomeIcon icon={faStar} size="lg" />
        <FontAwesomeIcon icon={faStar} size="lg" />
        <FontAwesomeIcon icon={faStar} size="lg" />
        <FontAwesomeIcon icon={faStar} size="lg" />
      </StarRateDiv>
    </RateStarDiv>
  );
};

export default DynamicStarRateDiv;
