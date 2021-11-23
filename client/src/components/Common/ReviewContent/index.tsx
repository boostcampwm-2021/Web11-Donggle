import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ContentWrapper,
  ContentDiv,
  ContentTopDiv,
  ContentTopTextDiv,
  DateText,
  AddressText,
  UserText,
  ContentTextDiv,
  ContentBottomDiv,
  RateDiv,
  EmptyDiv,
} from './index.style';
import StarRateDiv from '@components/Common/StarRate';
import BarRateDiv from '@components/Common/BarRate';
import DetailBtn from '@components/Common/DetailBtn';
import { IReviewContent } from '@myTypes/Review';
import { IAPIResult } from '@myTypes/Common';

import { fetchContentData } from '@controllers/sidebarController';
import { calcDateDiff } from '@utils/common';

interface IProps {
  address: string;
  selectedMenu: string;
  contentsData: IReviewContent[];
  updateSidebarContents: (contentsData: IReviewContent[]) => void;
}

const RegionContent: React.FC<IProps> = (props: IProps) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observer = useRef<null | IntersectionObserver>(null);

  // const showDate = (createdAt: Date) => {
  //   const now = new Date();
  //   const post = new Date(createdAt);
  //   const yearDiff = now.getUTCFullYear() - post.getUTCFullYear();
  //   if (yearDiff < 1) {
  //     const monthDiff = now.getUTCMonth() - post.getUTCMonth();
  //     if (monthDiff < 1) {
  //       const dateDiff = now.getUTCDate() - post.getUTCDate();
  //       if (dateDiff < 1) {
  //         const hourDiff = now.getUTCHours() - post.getUTCHours();
  //         if (hourDiff < 1) {
  //           const minuteDiff = now.getUTCMinutes() - post.getUTCMinutes();
  //           if (minuteDiff < 1) {
  //             return `방금전`;
  //           } else {
  //             return `${minuteDiff} 분전`;
  //           }
  //         } else {
  //           return `${hourDiff} 시간전`;
  //         }
  //       } else {
  //         return `${dateDiff} 일전`;
  //       }
  //     } else {
  //       return `${monthDiff} 달전`;
  //     }
  //   } else {
  //     return `${yearDiff} 년전`;
  //   }
  // };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const list: IAPIResult<IReviewContent[]> = await fetchContentData(
      props.address,
      props.selectedMenu,
      pageNumber,
    );
    if (list.result) {
      props.updateSidebarContents([...props.contentsData, ...list.result]);
    }
    setHasMore(list.result.length > 0);
    setIsLoading(false);
  }, [props, pageNumber]);

  useEffect(() => {
    setPageNumber(1);
    setHasMore(true);
  }, [props.address, props.selectedMenu]);

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      const ob = (observer.current = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            await fetchData();
            setPageNumber((prev) => prev + 1);
          }
        },
        { threshold: 0.7 },
      ));
      if (node) ob.observe(node);
    },
    [isLoading, hasMore, fetchData],
  );

  return (
    <ContentWrapper>
      {props.contentsData.length > 0 ? (
        props.contentsData.map((content, idx) => (
          <ContentDiv key={idx} ref={lastItemRef}>
            <ContentTopDiv>
              <StarRateDiv
                isLarge={false}
                total={(
                  Object.keys(content.categories).reduce((prev, curr) => {
                    return prev + content.categories[curr];
                  }, 0) / 4
                ).toFixed(1)}
              />
              <ContentTopTextDiv>
                {props.selectedMenu === 'myreview' ? (
                  <AddressText>{content.address}</AddressText>
                ) : (
                  <></>
                )}
                <DateText>{calcDateDiff(content.createdAt)}</DateText>
                <UserText>{content.user}</UserText>
              </ContentTopTextDiv>
            </ContentTopDiv>
            <ContentTextDiv>{content.text}</ContentTextDiv>
            <ContentBottomDiv>
              <DetailBtn>
                <RateDiv>
                  <BarRateDiv
                    count={1}
                    categories={content.categories}
                  ></BarRateDiv>
                </RateDiv>
              </DetailBtn>
            </ContentBottomDiv>
          </ContentDiv>
        ))
      ) : (
        <EmptyDiv>관련 글이 없어요! 글을 남겨주세요!</EmptyDiv>
      )}
    </ContentWrapper>
  );
};

export default RegionContent;
