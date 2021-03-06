import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import {
  RateStarDiv,
  CategorySpanDiv,
  CategorySpan,
  StarRateDiv,
  StarBtn,
} from './index.style';
import { ICategories } from '@myTypes/Review';

interface IProps {
  category: keyof ICategories;
  name: string;
  rate: number;
  setCategoryRate: (category: keyof ICategories, rate: number) => void;
}

const DynamicStarRateDiv: React.FC<IProps> = ({
  category,
  name,
  rate,
  setCategoryRate,
}) => {
  const [checkedNumber, setCheckedNumber] = useState(rate);
  const [number, setNumber] = useState(rate);
  const faIconList = Array.from({ length: 5 }, (_, index) => index + 1).map(
    (n) => {
      return (
        <StarBtn key={category + n}>
          <FontAwesomeIcon
            style={n <= number ? { color: 'gold' } : { color: 'lightgrey' }}
            icon={faStar}
            size="lg"
            onMouseOver={() => setNumber(n)}
            onMouseLeave={() => setNumber(checkedNumber)}
            onClick={() => {
              setCheckedNumber(n);
              setCategoryRate(category, n);
            }}
          />
        </StarBtn>
      );
    },
  );

  return (
    <RateStarDiv>
      <CategorySpanDiv>
        <CategorySpan>{name}</CategorySpan>
      </CategorySpanDiv>
      <StarRateDiv className="test">{faIconList}</StarRateDiv>
    </RateStarDiv>
  );
};

export default DynamicStarRateDiv;
