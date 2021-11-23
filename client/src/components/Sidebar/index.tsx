import React, { useCallback, useEffect, useRef, useState } from 'react';

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
import { calcTotal } from '@utils/common';
import { useRecoilState } from 'recoil';
import { IMapInfo } from '@myTypes/Map';
import { IReviewContent } from '@myTypes/Review';
import { fetchContentData } from '@controllers/sidebarController';
import { IAPIResult } from '@myTypes/Common';
import { IAuthInfo } from '@myTypes/User';
import { authState } from '@stores/atoms';

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
  const layout = useRef<HTMLDivElement | null>(null);
  const [auth] = useRecoilState<IAuthInfo>(authState);

  const total = calcTotal(props.rateData.categories) / props.rateData.count;
  const onMenuClick = useCallback(
    async (menu) => {
      if (menu === selectedMenu) return;

      setSelectedMenu(menu);
      const sidebarContents: IAPIResult<IReviewContent[]> =
        await fetchContentData(props.rateData.address, menu);

      props.updateSidebarContents(sidebarContents.result || []);
    },
    [props, selectedMenu],
  );

  useEffect(() => {
    setSelectedMenu('review');
  }, [props.rateData.address, auth]);

  useEffect(() => {
    if (layout.current !== null) layout.current.scrollTo(0, 0);
  }, [selectedMenu]);

  return (
    <Layout ref={layout} className={`${props.sidebar ? 'open' : ''}`}>
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
          <HashTagList hashTags={Object.keys(props.hashTagData)} />
        ) : (
          <HashTagNo>아직 해시태그가 없어요...</HashTagNo>
        )}
      </HashTagDiv>
      <MenuBarDiv>
        <Menu
          onClick={() => onMenuClick('review')}
          className={`${selectedMenu === 'review' && 'menu-selected'}`}
        >
          동네후기
        </Menu>
        {sessionStorage.getItem('jwt') ? (
          <Menu
            onClick={() => onMenuClick('myreview')}
            className={`${selectedMenu === 'myreview' && 'menu-selected'}`}
          >
            내 후기
          </Menu>
        ) : (
          <></>
        )}
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
