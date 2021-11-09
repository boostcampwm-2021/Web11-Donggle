import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
  RateStarBaseDiv,
  RateStarFillDiv,
} from './index.style';

interface IProps {
  sidebar: boolean | null;
  starRate: number;
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
          <RateSpanText>{props.starRate}</RateSpanText>
          <RateStarDiv>
            <RateStarBaseDiv>
              <FontAwesomeIcon icon={faStar} size="lg" />
              <FontAwesomeIcon icon={faStar} size="lg" />
              <FontAwesomeIcon icon={faStar} size="lg" />
              <FontAwesomeIcon icon={faStar} size="lg" />
              <FontAwesomeIcon icon={faStar} size="lg" />
            </RateStarBaseDiv>
            <RateStarFillDiv starRate={props.starRate}>
              <FontAwesomeIcon icon={faStar} size="lg" />
              <FontAwesomeIcon icon={faStar} size="lg" />
              <FontAwesomeIcon icon={faStar} size="lg" />
              <FontAwesomeIcon icon={faStar} size="lg" />
              <FontAwesomeIcon icon={faStar} size="lg" />
            </RateStarFillDiv>
          </RateStarDiv>
        </RateNumStarDiv>
      </RateDiv>
    </Layout>
  );
};

export default Sidebar;
