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
  RateSpanText,
  RateNumStarDiv,
  RateStarDiv,
  RateStarBaseDiv,
  RateStarFillDiv,
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

export interface RateProps {
  sidebar: boolean | null;
  starRate: number;
  categoryRate: {
    safety: number;
    traffic: number;
    food: number;
    entertainment: number;
  };
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
          <RateNumStarDiv>
            <RateSpanText>{props.starRate.toFixed(1)}</RateSpanText>
            <RateStarDiv>
              <RateStarFillDiv starRate={props.starRate}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </RateStarFillDiv>
              <RateStarBaseDiv>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </RateStarBaseDiv>
            </RateStarDiv>
          </RateNumStarDiv>
          <RateCategoryDiv>
            <RateCategoryGroup>
              <RateCategoryTitle>치안</RateCategoryTitle>
              <RateCategoryUnit>
                <RateCategoryBar
                  categoryRate={props.categoryRate.safety}
                ></RateCategoryBar>
                <RateCategoryNum>{props.categoryRate.safety}</RateCategoryNum>
              </RateCategoryUnit>
              <RateCategoryTitle>교통</RateCategoryTitle>
              <RateCategoryUnit>
                <RateCategoryBar
                  categoryRate={props.categoryRate.traffic}
                ></RateCategoryBar>
                <RateCategoryNum>{props.categoryRate.traffic}</RateCategoryNum>
              </RateCategoryUnit>
              <RateCategoryTitle>음식</RateCategoryTitle>
              <RateCategoryUnit>
                <RateCategoryBar
                  categoryRate={props.categoryRate.food}
                ></RateCategoryBar>
                <RateCategoryNum>{props.categoryRate.food}</RateCategoryNum>
              </RateCategoryUnit>
              <RateCategoryTitle>놀거리</RateCategoryTitle>
              <RateCategoryUnit>
                <RateCategoryBar
                  categoryRate={props.categoryRate.entertainment}
                ></RateCategoryBar>
                <RateCategoryNum>
                  {props.categoryRate.entertainment}
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
          <Content>Test1</Content>
          <Content>Test2</Content>
          <Content>Test3</Content>
          <Content>Test4</Content>
          <Content>Test5</Content>
          <Content>Test6</Content>
        </ContentDiv>
        <AddButtonDiv>
          <AddButton>후기 작성하기</AddButton>
        </AddButtonDiv>
      </Layout>
    </Container>
  );
};

export default Sidebar;
