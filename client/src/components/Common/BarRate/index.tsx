import React from 'react';

import {
  RateCategoryDiv,
  RateCategoryGroup,
  RateCategoryTitle,
  RateCategoryUnit,
  RateCategoryBar,
  RateCategoryNum,
} from './index.style';
import { Category } from '@utils/enum';
import { ICategories } from '@myTypes/Review';

interface IProps {
  count: number;
  categories: ICategories;
}

const BarRateDiv: React.FC<IProps> = ({ count, categories }) => {
  const bar = Object.keys(categories)
    .filter((category) => category !== '_id')
    .map((category, idx) => {
      return (
        <React.Fragment key={category + idx}>
          <RateCategoryTitle>{Category[category]}</RateCategoryTitle>
          <RateCategoryUnit>
            <RateCategoryBar
              rate={categories[category] / count || 0}
            ></RateCategoryBar>
            <RateCategoryNum>
              {isNaN(categories[category] / count)
                ? 'N/A'
                : (categories[category] / count).toFixed(1)}
            </RateCategoryNum>
          </RateCategoryUnit>
        </React.Fragment>
      );
    });

  return (
    <RateCategoryDiv>
      <RateCategoryGroup>{bar}</RateCategoryGroup>
    </RateCategoryDiv>
  );
};

export default BarRateDiv;
