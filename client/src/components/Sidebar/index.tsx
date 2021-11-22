import React, { useCallback, useState } from 'react';

import {
  Layout,
  TitleDiv,
  SpanBackArrow,
  EmptySpan,
  SpanTitle,
  RateDiv,
  HashTagDiv,
  HashTagNo,
  MenuBarDiv,
  Menu,
} from './index.style';
import StarRateDiv from '@components/Common/StarRate';
import BarRateDiv from '@components/Common/BarRate';
import HashTagList from '@components/Common/HashTag';
import ReviewContent from '@components/Common/ReviewContent';
import { IMapInfo } from '@myTypes/Map';
import { calcTotal } from '@utils/common';
import { IReviewContent } from '@myTypes/Review';

export interface IProps {
  sidebar: boolean;
  rateData: IMapInfo;
  contentsData: IReviewContent[];
  updateSidebarContents: (contentsData: IReviewContent[]) => void;
  hashTagData: Map<string, number>;
  closeSidebar: () => void;
}

const Sidebar: React.FC<IProps> = (props: IProps) => {
  const [selectedMenu, setSelectedMenu] = useState('review');

  const total = calcTotal(props.rateData.categories) / props.rateData.count;

  const filterTop5Hashtags = (hashtags: Map<string, number>) =>
    Array.from(hashtags.entries())
      .sort((a, b) => a[1] - b[1])
      .map((hashtag) => hashtag[0])
      .slice(0, 5);

  return (
    <Layout className={`${props.sidebar ? 'open' : ''}`}>
      <TitleDiv>
        <SpanBackArrow onClick={() => props.closeSidebar()}>❯</SpanBackArrow>
        <SpanTitle>{props.rateData.address}</SpanTitle>
        <EmptySpan></EmptySpan>
      </TitleDiv>
      <RateDiv>
        <StarRateDiv isLarge={true} total={total.toFixed(1)} />
        <BarRateDiv
          categories={props.rateData.categories}
          count={props.rateData.count}
        />
      </RateDiv>
      <HashTagDiv>
        {Object.keys(props.hashTagData).length ? (
          <HashTagList
            hashTags={filterTop5Hashtags(
              new Map(Object.entries(props.hashTagData)),
            )}
          />
        ) : (
          <HashTagNo>아직 해시태그가 없어요...</HashTagNo>
        )}
      </HashTagDiv>
      <MenuBarDiv>
        <Menu
          onClick={() => setSelectedMenu('review')}
          className={`${selectedMenu === 'review' && 'menu-selected'}`}
        >
          동네후기
        </Menu>
        <Menu
          onClick={() => setSelectedMenu('myreview')}
          className={`${selectedMenu === 'myreview' && 'menu-selected'}`}
        >
          내 후기
        </Menu>
      </MenuBarDiv>
      <ReviewContent
        address={props.rateData.address}
        selectedMenu={selectedMenu}
        contentsData={props.contentsData}
        updateSidebarContents={props.updateSidebarContents}
      />
    </Layout>
  );
};

export default Sidebar;
