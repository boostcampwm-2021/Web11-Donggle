import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ContentWrapper,
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
import { fetchContentData } from '@controllers/reviewController';

interface IProps {
  address: string;
  selectedMenu: string;
}

const RegionContent: React.FC<IProps> = (props: IProps) => {
  const [contentLists, setContentLists] = useState<IReviewContent[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observer = useRef<null | IntersectionObserver>(null);
  const NUMBER_OF_DATA_PER_PAGE = 3;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const list: IAPIResult<IReviewContent[]> = await fetchContentData(
      props.address,
      props.selectedMenu,
      pageNumber,
      NUMBER_OF_DATA_PER_PAGE,
    );
    if (list.result) {
      console.log('list', list.result);
      setContentLists([...contentLists, ...list.result]);
      setHasMore(list.result.length > 0);
    }
    setIsLoading(false);
  }, [pageNumber]);

  // 초기 1회 fetch
  useEffect(() => {
    // console.log(contentLists);
    (async () => await fetchData())();
  }, [pageNumber]);

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      const ob = (observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber((prev) => prev + 1);
          }
        },
        { threshold: 1 },
      ));
      if (node) ob.observe(node);
    },
    [hasMore, isLoading],
  );

  return (
    <ContentWrapper>
      {contentLists.map((content, idx) =>
        props.selectedMenu === 'review' ? (
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
              <UserText>{content.user}</UserText>
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
        ) : (
          <ContentDiv>Article 입니다.</ContentDiv>
        ),
      )}
    </ContentWrapper>
  );
};

export default RegionContent;
