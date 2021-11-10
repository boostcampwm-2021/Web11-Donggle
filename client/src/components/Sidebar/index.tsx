import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import {
  Container,
  Layout,
  WrapperDiv,
  SpanBackArrow,
  // SpanText,
  EmptySpan,
  SpanTitle,
  // SpanReviewTitle,
  RateDiv,
  RateCategoryDiv,
  RateCategoryGroup,
  RateCategoryTitle,
  RateCategoryUnit,
  RateCategoryBar,
  RateCategoryNum,
  HashTagDiv,
  HashTag,
  MenuBarDiv,
  Menu,
  ContentDiv,
  Content,
  AddButtonDiv,
  AddButton,
} from './index.style';
import { TempRateType, TempReviewType } from '@pages/MainPage';
import StarRateDiv from '@components/Common/StarRate';

export interface RateProps {
  sidebar: boolean | null;
  rateData: TempRateType;
  reviewData: TempReviewType[];
  closeSidebar: () => void;
}

const Sidebar: React.FC<RateProps> = (props: RateProps) => {
  const [selectedMenu, setSelectedMenu] = useState('review');
  const fetchData = (menu: string) => {
    console.log(menu);
    setSelectedMenu(menu);
  };
  console.log(props.rateData);

  return (
    <Container>
      <Layout
        className={`${props.sidebar ? 'open' : ''}`}
        sidebar={props.sidebar}
      >
        <WrapperDiv>
          <SpanBackArrow onClick={() => props.closeSidebar()}>❮</SpanBackArrow>
          <SpanTitle>서울특별시 용산구 후암동</SpanTitle>
          <EmptySpan></EmptySpan>
        </WrapperDiv>
        {/* <WrapperDiv>
          <SpanReviewTitle>동네 평점</SpanReviewTitle>
        </WrapperDiv> */}
        <RateDiv>
          <StarRateDiv isLarge={true} total={props.rateData.total} />
          <RateCategoryDiv>
            <RateCategoryGroup>
              <RateCategoryTitle>치안</RateCategoryTitle>
              <RateCategoryUnit>
                <RateCategoryBar
                  categoryRate={props.rateData.safety}
                ></RateCategoryBar>
                <RateCategoryNum>{props.rateData.safety}</RateCategoryNum>
              </RateCategoryUnit>
              <RateCategoryTitle>교통</RateCategoryTitle>
              <RateCategoryUnit>
                <RateCategoryBar
                  categoryRate={props.rateData.traffic}
                ></RateCategoryBar>
                <RateCategoryNum>{props.rateData.traffic}</RateCategoryNum>
              </RateCategoryUnit>
              <RateCategoryTitle>음식</RateCategoryTitle>
              <RateCategoryUnit>
                <RateCategoryBar
                  categoryRate={props.rateData.food}
                ></RateCategoryBar>
                <RateCategoryNum>{props.rateData.food}</RateCategoryNum>
              </RateCategoryUnit>
              <RateCategoryTitle>놀거리</RateCategoryTitle>
              <RateCategoryUnit>
                <RateCategoryBar
                  categoryRate={props.rateData.entertainment}
                ></RateCategoryBar>
                <RateCategoryNum>
                  {props.rateData.entertainment}
                </RateCategoryNum>
              </RateCategoryUnit>
            </RateCategoryGroup>
          </RateCategoryDiv>
        </RateDiv>
        <HashTagDiv>
          <HashTag>소음이 적은</HashTag>
          <HashTag>경관이 좋은</HashTag>
          <HashTag>문화시설이 가까운</HashTag>
          <HashTag>체육시설이 많은</HashTag>
          <HashTag>역이 가까운</HashTag>
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
        <ContentDiv>
          {props.reviewData.map((review) => (
            <>
              <div>
                <span>{review.total}</span>
                <span>{review.user}</span>
              </div>
              <div>
                <span>{review.text}</span>
              </div>
            </>
          ))}
        </ContentDiv>
        <AddButtonDiv>
          <AddButton>후기 작성하기</AddButton>
        </AddButtonDiv>
      </Layout>
    </Container>
  );
};

export default Sidebar;
