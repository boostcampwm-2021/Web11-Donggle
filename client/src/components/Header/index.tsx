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

import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import useHistoryRouter from '@hooks/useHistoryRouter';
import { useRecoilState } from 'recoil';

const Header: React.FC = () => {
  const routeHistory = useHistoryRouter();
  const { pathname } = useLocation();
  const [auth, setAuth] = useRecoilState(authState);

  const onMapClick = useCallback(() => {
    routeHistory('/map');
  }, [routeHistory]);

  const onRankClick = useCallback(() => {
    routeHistory('/map/ranking');
  }, [routeHistory]);

  const onLogoutClick = useCallback(() => {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('refreshToken');
    setAuth({
      isLoggedin: false,
      oauth_email: '',
      address: '',
      image: '',
    });
  }, [setAuth]);

  const onWriteReviewClick = useCallback(() => {
    routeHistory('/map/write-review');
  }, [routeHistory]);

  const onProfileClick = useCallback(() => {
    routeHistory('/profile');
  }, [routeHistory]);

  const onSignInClick = useCallback(() => {
    routeHistory('/map/signin');
  }, [routeHistory]);

  return (
    <>
      <Layout>
        <Background>
          <LogoMenuContainer>
            <LogoWrapper>
              <LinkBtn
                onClick={onMapClick}
                className={`${pathname === '/map' && 'link-selected'}`}
              >
                <img src={logo} alt="logo" width="70px" />
              </LinkBtn>
            </LogoWrapper>
            <MenuWrapper>
              <MenuList>
                <Menu>
                  <LinkBtn
                    onClick={onMapClick}
                    className={`${pathname === '/map' && 'link-selected'}`}
                  >
                    동네 지도
                  </LinkBtn>
                </Menu>
                <Menu>
                  <LinkBtn
                    onClick={onRankClick}
                    className={`${
                      pathname === '/map/ranking' && 'link-selected'
                    }`}
                  >
                    동네 랭킹
                  </LinkBtn>
                </Menu>
              </MenuList>
            </MenuWrapper>
          </LogoMenuContainer>
          <ProfileWrapper>
            <ReviewButton onClick={onWriteReviewClick}>
              내 동네 후기 쓰기
            </ReviewButton>
            {sessionStorage.getItem('jwt') ? (
              <>
                <LogoutBtn onClick={onLogoutClick}>로그아웃</LogoutBtn>
                <UserProfile onClick={onProfileClick}>
                  <ProfileImage src={auth.image} alt="프로필사진" />
                </UserProfile>
              </>
            ) : (
              <>
                <SignInBtn onClick={onSignInClick}>로그인</SignInBtn>
              </>
            )}
          </ProfileWrapper>
        </Background>
      </Layout>
      <ColorBar></ColorBar>
    </>
  );
};

export default React.memo(Header);
