import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ContentWrapper,
  ContentDiv,
  ContentTopDiv,
  ContentTopTextDiv,
  DateText,
  AddressText,
  UserImage,
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
  const pageNumber = useRef<number>(1);
  const hasMoreRef = useRef<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observer = useRef<null | IntersectionObserver>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const list: IAPIResult<IReviewContent[]> = await fetchContentData(
      props.address,
      props.selectedMenu,
      pageNumber.current,
    );
    if (list.result) {
      props.updateSidebarContents([...props.contentsData, ...list.result]);
    }
    hasMoreRef.current = list.result && list.result.length > 0;
    setIsLoading(false);
  }, [props, pageNumber]);

  useEffect(() => {
    pageNumber.current = 1;
    hasMoreRef.current = true;
  }, [props.address, props.selectedMenu]);

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      const ob = (observer.current = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting && hasMoreRef) {
            await fetchData();
            pageNumber.current += 1;
          }
        },
        { threshold: 1 },
      ));
      if (node && hasMoreRef) ob.observe(node);
    },
    [hasMoreRef, props.contentsData],
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
                <UserImage src={content.image}></UserImage>
              </ContentTopTextDiv>
            </ContentTopDiv>
            <ContentTextDiv>{content.text || ''}</ContentTextDiv>
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
