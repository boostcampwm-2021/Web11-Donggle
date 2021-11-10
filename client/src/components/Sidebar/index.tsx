import React, { useState } from 'react';

import {
  Container,
  Layout,
  TitleDiv,
  SpanBackArrow,
  EmptySpan,
  SpanTitle,
  RateDiv,
  HashTagDiv,
  MenuBarDiv,
  Menu,
  ContentDiv,
  ContentTopDiv,
  UserText,
  ContentTextDiv,
  ContentBottomDiv,
  DetailBtn,
  AddButtonDiv,
  AddButton,
} from './index.style';
import { RateType, ReviewType } from '@pages/MainPage';
import StarRateDiv from '@components/Common/StarRate';
import BarRateDiv from '@components/Common/BarRate';
import HashTagList from '@components/Common/HashTag';

export interface RateProps {
  sidebar: boolean | null;
  rateData: RateType;
  reviewData: ReviewType[];
  hashTagData: string[];
  closeSidebar: () => void;
}

const Sidebar: React.FC<RateProps> = (props: RateProps) => {
  const [selectedMenu, setSelectedMenu] = useState('review');
  const fetchData = (menu: string) => {
    console.log(menu);
    setSelectedMenu(menu);
  };

  return (
    <Container>
      <Layout className={`${props.sidebar ? 'open' : ''}`}>
        <TitleDiv>
          <SpanBackArrow onClick={() => props.closeSidebar()}>❮</SpanBackArrow>
          <SpanTitle>{props.rateData.address}</SpanTitle>
          <EmptySpan></EmptySpan>
        </TitleDiv>
        <RateDiv>
          <StarRateDiv
            isLarge={true}
            total={(props.rateData.total / props.rateData.count).toFixed(1)}
          />
          <BarRateDiv
            categories={props.rateData.categories}
            count={props.rateData.count}
          />
        </RateDiv>
        <HashTagDiv>
          <HashTagList hashTags={props.hashTagData} />
        </HashTagDiv>
        <MenuBarDiv>
          <Menu
            onClick={() => fetchData('review')}
            className={`${selectedMenu === 'review' && 'menu-selected'}`}
          >
            동네후기
          </Menu>
          <Menu
            onClick={() => fetchData('info')}
            className={`${selectedMenu === 'info' && 'menu-selected'}`}
          >
            동네정보
          </Menu>
        </MenuBarDiv>
        {props.reviewData.map((review, idx) => (
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
              <DetailBtn>자세히보기</DetailBtn>
            </ContentBottomDiv>
          </ContentDiv>
        ))}
        <AddButtonDiv>
          <AddButton>내 동네 후기 작성하기</AddButton>
        </AddButtonDiv>
      </Layout>
    </Container>
  );
};

export default Sidebar;
