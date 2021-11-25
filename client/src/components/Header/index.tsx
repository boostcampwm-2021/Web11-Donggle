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
  SignInBtn,
  ReviewButton,
  LogoutBtn,
  UserProfile,
  ColorBar,
  ProfileImage,
} from './index.style';

import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import useHistoryRouter from '@hooks/useHistoryRouter';
import { useRecoilState } from 'recoil';

const Header: React.FC = () => {
  const routeHistory = useHistoryRouter();
  const location = useLocation();

  const [clickedLinkBtnId, setClickedLinkBtnId] = useState('/');
  const [auth, setAuth] = useRecoilState(authState);

  const onLogoutClick = useCallback(() => {
    fetch(`${process.env.REACT_APP_API_URL as string}/api/auth/logout`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    });
    sessionStorage.removeItem('timer');
    setAuth({
      isLoggedin: false,
      oauthEmail: '',
      address: '',
      image: '',
    });
  }, []);

  useEffect(() => {
    setClickedLinkBtnId(location.pathname);
  }, [clickedLinkBtnId, location]);

  return (
    <>
      <Layout>
        <Background>
          <LogoMenuContainer>
            <LogoWrapper>
              <LinkBtn
                onClick={() => routeHistory('/map')}
                className={`${clickedLinkBtnId === '/' && 'link-selected'}`}
              >
                <img src={logo} alt="logo" width="70px" />
              </LinkBtn>
            </LogoWrapper>
            <MenuWrapper>
              <MenuList>
                <Menu>
                  <LinkBtn
                    onClick={() => routeHistory('/map')}
                    className={`${clickedLinkBtnId === '/' && 'link-selected'}`}
                  >
                    동네 지도
                  </LinkBtn>
                </Menu>
                <Menu>
                  <LinkBtn
                    onClick={() => routeHistory('/map/ranking')}
                    className={`${
                      clickedLinkBtnId === '/ranking' && 'link-selected'
                    }`}
                  >
                    동네 랭킹
                  </LinkBtn>
                </Menu>
              </MenuList>
            </MenuWrapper>
          </LogoMenuContainer>
          <ProfileWrapper>
            <ReviewButton
              onClick={() => {
                routeHistory('/map/write-review');
              }}
            >
              내 동네 후기 쓰기
            </ReviewButton>
            {sessionStorage.getItem('timer') ? (
              <>
                <LogoutBtn onClick={onLogoutClick}>로그아웃</LogoutBtn>
                <UserProfile onClick={() => routeHistory('profile')}>
                  <ProfileImage src={auth.image} alt="프로필사진" />
                </UserProfile>
              </>
            ) : (
              <>
                <SignInBtn onClick={() => routeHistory('/map/signin')}>
                  로그인
                </SignInBtn>
              </>
            )}
          </ProfileWrapper>
        </Background>
      </Layout>
      <ColorBar></ColorBar>
    </>
  );
};

export default Header;
