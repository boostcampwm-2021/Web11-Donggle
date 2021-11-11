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
  count: number;
  categories: {
    safety: number;
    traffic: number;
    food: number;
    entertainment: number;
  };
}

const BarRateDiv: React.FC<IProps> = ({ count, categories }) => {
  const bar = (Object.keys(categories) as (keyof typeof Category)[]).map(
    (category) => {
      return (
        <>
          <RateCategoryTitle>{Category[category]}</RateCategoryTitle>
          <RateCategoryUnit>
            <RateCategoryBar
              rate={categories[category] / count}
            ></RateCategoryBar>
            <RateCategoryNum>
              {(categories[category] / count).toFixed(1)}
            </RateCategoryNum>
          </RateCategoryUnit>
        </>
      );
    },
  );

  return (
    <RateCategoryDiv>
      <RateCategoryGroup>{bar}</RateCategoryGroup>
    </RateCategoryDiv>
  );
};

export default BarRateDiv;
