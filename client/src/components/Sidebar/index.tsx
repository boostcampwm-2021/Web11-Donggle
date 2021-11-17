import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import {
  Layout,
  TitleDiv,
  SpanBackArrow,
  EmptySpan,
  SpanTitle,
  RateDiv,
  HashTagDiv,
  MenuBarDiv,
  Menu,
  AddButtonDiv,
  AddButton,
} from './index.style';
import StarRateDiv from '@components/Common/StarRate';
import BarRateDiv from '@components/Common/BarRate';
import HashTagList from '@components/Common/HashTag';
import { IMapInfo } from '@myTypes/Map';
import { calcTotal } from '@utils/common';
import ReviewContent from '@components/Common/ReviewContent';

export interface IProps {
  sidebar: boolean;
  rateData: IMapInfo;
  hashTagData: string[];
  closeSidebar: () => void;
}

const Sidebar: React.FC<IProps> = (props: IProps) => {
  const [selectedMenu, setSelectedMenu] = useState('review');
  const history = useHistory();
  const location = useLocation();

  const total = calcTotal(props.rateData.categories) / props.rateData.count;

  return (
    <Layout className={`${props.sidebar ? 'open' : ''}`}>
      <TitleDiv>
        <SpanBackArrow onClick={() => props.closeSidebar()}>❮</SpanBackArrow>
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
        <HashTagList hashTags={props.hashTagData} />
      </HashTagDiv>
      <MenuBarDiv>
        <Menu
          onClick={() => setSelectedMenu('review')}
          className={`${selectedMenu === 'review' && 'menu-selected'}`}
        >
          동네후기
        </Menu>
        <Menu
          onClick={() => setSelectedMenu('article')}
          className={`${selectedMenu === 'article' && 'menu-selected'}`}
        >
          동네정보
        </Menu>
      </MenuBarDiv>
      <ReviewContent
        address={props.rateData.address}
        selectedMenu={selectedMenu}
      />
      <AddButtonDiv>
        <AddButton
          onClick={() => {
            history.push({
              pathname: '/write-review',
              state: { background: location },
            });
          }}
        >
          내 동네 후기 작성하기
        </AddButton>
      </AddButtonDiv>
    </Layout>
  );
};

export default Sidebar;
