import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import {
  RateStarDiv,
  CategorySpanDiv,
  CategorySpan,
  StarRateDiv,
} from './index.style';
import { mouseOverStarHandler } from '@controllers/reviewController';

const DynamicStarRateDiv: React.FC<{ category: string }> = ({ category }) => {
  const faIconList = Array(5)
    .fill(1)
    .map((n) => {
      return <FontAwesomeIcon key={n} icon={faStar} size="lg" />;
    });
  return (
    <RateStarDiv>
      <CategorySpanDiv>
        <CategorySpan>{category}</CategorySpan>
      </CategorySpanDiv>
      <StarRateDiv>{faIconList}</StarRateDiv>
    </RateStarDiv>
  );
};

export default DynamicStarRateDiv;
