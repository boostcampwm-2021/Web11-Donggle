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

interface IProps extends CategoryRateType {
  count: number;
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
