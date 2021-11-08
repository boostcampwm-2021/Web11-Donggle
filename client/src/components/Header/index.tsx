import { authState } from '@stores/atoms';
import logo from '@assets/images/logo.png';
import {
  LinkBtn,
  Layout,
  Background,
  LogoMenuContainer,
  LogoWrapper,
  MenuWrapper,
  MenuList,
  Menu,
  ProfileWrapper,
  LoginBtn,
  LogoutBtn,
  UserProfile,
  ColorBar,
} from './index.style';

import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const Header: React.FC = withRouter(({ history, location }) => {
  const [clickedLinkBtnId, setClickedLinkBtnId] = useState('/');
  const [isAuth, setIsAuth] = useRecoilState(authState);

  const openSideBar = useCallback(() => {
    console.log('test');
  }, []);

  const routeHistory = useCallback(
    (path: string, state: { [index: string]: string }) => {
      history.push({
        pathname: path,
        state: state,
      });
    },
    [history],
  );

  useEffect(() => {
    setClickedLinkBtnId(location.pathname);
  }, [clickedLinkBtnId, location]);

  return (
    <>
      <Layout>
        <Background>
          <LogoMenuContainer>
            <LogoWrapper>
              <img src={logo} alt="logo" width="70px" />
            </LogoWrapper>
            <MenuWrapper>
              <MenuList>
                <Menu>
                  <LinkBtn
                    onClick={() => routeHistory('/', {})}
                    className={`${clickedLinkBtnId === '/' && 'link-selected'}`}
                  >
                    동네 지도
                  </LinkBtn>
                </Menu>
                <Menu>
                  <LinkBtn
                    onClick={() => routeHistory('/review', {})}
                    className={`${
                      clickedLinkBtnId === '/review' && 'link-selected'
                    }`}
                  >
                    동네 후기
                  </LinkBtn>
                </Menu>
                <Menu>
                  <LinkBtn
                    onClick={() =>
                      routeHistory('/ranking', { background: location })
                    }
                    className={`${
                      clickedLinkBtnId === '/ranking' && 'link-selected'
                    }`}
                  >
                    동네 랭킹
                  </LinkBtn>
                </Menu>
              </MenuList>
              <LinkBtn onClick={() => openSideBar()}>사이드바 열기</LinkBtn>
            </MenuWrapper>
          </LogoMenuContainer>
          <ProfileWrapper>
            {isAuth ? (
              <>
                <LogoutBtn>로그아웃</LogoutBtn>
                <UserProfile>프로필</UserProfile>
              </>
            ) : (
              <LoginBtn>로그인</LoginBtn>
            )}
          </ProfileWrapper>
        </Background>
      </Layout>
      <ColorBar></ColorBar>
    </>
  );
});

export default Header;
