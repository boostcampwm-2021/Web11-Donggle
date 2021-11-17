import React, { useState, useEffect, useCallback } from 'react';
import {
  ContentDiv,
  ContentTopDiv,
  UserText,
  ContentTextDiv,
  ContentBottomDiv,
  RateDiv,
} from './index.style';
import StarRateDiv from '@components/Common/StarRate';
import BarRateDiv from '@components/Common/BarRate';
import DetailBtn from '@components/Common/DetailBtn';
import { IReviewContent } from '@myTypes/Review';
import { IAPIResult } from '@myTypes/Common';
import { fetchReviewData } from '@controllers/reviewController';

interface IProps {
  address: string;
  selectedMenu: string;
}

const ReviewContent: React.FC<IProps> = (props: IProps) => {
  const [reviewLists, setReviewLists] = useState<IReviewContent[]>([]);

  const fetchData = useCallback(
    async (address: string, selectedMenu: string) => {
      const list: IAPIResult<IReviewContent[]> = await fetchReviewData(
        address,
        selectedMenu,
      );
      setReviewLists(list.result);
    },
    [],
  );

  useEffect(() => {
    fetchData(props.address, props.selectedMenu);
  }, [props.address, fetchData, props.selectedMenu]);

  return (
    <>
      {reviewLists.map((review, idx) => (
        <ContentDiv key={idx}>
          <ContentTopDiv>
            <StarRateDiv
              isLarge={false}
              total={(
                Object.keys(review.categories).reduce((prev, curr) => {
                  return prev + review.categories[curr];
                }, 0) / 4
              ).toFixed(1)}
            />
            <UserText>{review.user}</UserText>
          </ContentTopDiv>
          <ContentTextDiv>{review.text}</ContentTextDiv>
          <ContentBottomDiv>
            <DetailBtn>
              <RateDiv>
                <BarRateDiv
                  count={1}
                  categories={review.categories}
                ></BarRateDiv>
              </RateDiv>
            </DetailBtn>
          </ContentBottomDiv>
        </ContentDiv>
      ))}
    </>
  );
};

export default ReviewContent;
