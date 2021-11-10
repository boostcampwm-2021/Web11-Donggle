import React from 'react';

import {
  RateCategoryDiv,
  RateCategoryGroup,
  RateCategoryTitle,
  RateCategoryUnit,
  RateCategoryBar,
  RateCategoryNum,
} from './index.style';

enum Category {
  safety = '치안',
  traffic = '교통',
  food = '음식',
  entertainment = '놀거리',
}

interface IProps {
  categories: {
    safety: number;
    traffic: number;
    food: number;
    entertainment: number;
  };
}

const BarRateDiv: React.FC<IProps> = ({ categories }) => {
  const bar = (Object.keys(categories) as (keyof typeof Category)[]).map(
    (category) => {
      return (
        <>
          <RateCategoryTitle>{Category[category]}</RateCategoryTitle>
          <RateCategoryUnit>
            <RateCategoryBar rate={categories[category]}></RateCategoryBar>
            <RateCategoryNum>{categories[category]}</RateCategoryNum>
          </RateCategoryUnit>
        </>
      );
    },
  );
  console.log(bar);

  return (
    <RateCategoryDiv>
      <RateCategoryGroup>{bar}</RateCategoryGroup>
    </RateCategoryDiv>
  );
};

export default BarRateDiv;
