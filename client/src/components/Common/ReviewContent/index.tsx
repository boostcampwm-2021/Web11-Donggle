import React, { useState } from 'react';
import {
  ContentDiv,
  ContentTopDiv,
  UserText,
  ContentTextDiv,
  ContentBottomDiv,
  DetailBtn,
  CloseDetailBtn,
  RateDiv,
} from './index.style';
import StarRateDiv from '@components/Common/StarRate';
import { IReviewContent } from '@myTypes/Review';
import BarRateDiv from '../BarRate';

interface IProps {
  review: IReviewContent;
}

const ReviewContent: React.FC<IProps> = (props: IProps) => {
  const [isDetailActive, setIsDetailActive] = useState(false);
  const detailBtnClick = () => {
    setIsDetailActive(!isDetailActive);
  };
  return (
    <ContentDiv>
      <ContentTopDiv>
        <StarRateDiv
          isLarge={false}
          total={(
            Object.keys(props.review.categories).reduce((prev, curr) => {
              return prev + props.review.categories[curr];
            }, 0) / 4
          ).toFixed(1)}
        />
        <UserText>{props.review.user}</UserText>
      </ContentTopDiv>
      <ContentTextDiv>{props.review.text}</ContentTextDiv>
      <ContentBottomDiv>
        {isDetailActive ? (
          <>
            <RateDiv>
              <BarRateDiv
                count={1}
                categories={props.review.categories}
              ></BarRateDiv>
            </RateDiv>
            <CloseDetailBtn onClick={() => detailBtnClick()}>
              닫기
            </CloseDetailBtn>
          </>
        ) : (
          <DetailBtn onClick={() => detailBtnClick()}>자세히보기</DetailBtn>
        )}
      </ContentBottomDiv>
    </ContentDiv>
  );
};

export default ReviewContent;
