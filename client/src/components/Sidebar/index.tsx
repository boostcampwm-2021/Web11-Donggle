import React from 'react';

import {
  Layout,
  WrapperDiv,
  SpanBackArrow,
  SpanTitle,
  SpanReviewTitle,
  RateDiv,
  RateSpanText,
  RateNumStarDiv,
  RateStarDiv,
} from './index.style';

interface IProps {
  sidebar: boolean | null;
}

const Sidebar: React.FC<IProps> = (props: IProps) => {
  return (
    <Layout
      className={`${props.sidebar ? 'open' : ''}`}
      sidebar={props.sidebar}
    >
      <WrapperDiv>
        <SpanBackArrow>❮</SpanBackArrow>
        <SpanTitle>서울특별시 용산구 후암동</SpanTitle>
      </WrapperDiv>
      <WrapperDiv>
        <SpanReviewTitle>동네 평점</SpanReviewTitle>
      </WrapperDiv>
      <RateDiv>
        <RateNumStarDiv>
          <RateSpanText>4.4</RateSpanText>
          <RateStarDiv>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </RateStarDiv>
        </RateNumStarDiv>
      </RateDiv>
    </Layout>
  );
};

export default Sidebar;
