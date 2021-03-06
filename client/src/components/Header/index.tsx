import { authState } from '@stores/atoms';
import logo from '@assets/images/logo.webp';
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
import { signOut } from '@controllers/headerController';

const Header: React.FC = () => {
  const routeHistory = useHistoryRouter();
  const { pathname } = useLocation();
  const [auth, setAuth] = useRecoilState(authState);

  const onMapClick = useCallback(() => {
    routeHistory('/map');
  }, [routeHistory]);

  const onRankClick = useCallback(() => {
    routeHistory(`${pathname}/ranking`);
  }, [routeHistory, pathname]);

  const onSignOutClick = useCallback(() => {
    signOut(setAuth);
    routeHistory('/map');
  }, []);

  const onWriteReviewClick = useCallback(() => {
    routeHistory(`${pathname}/write-review`);
  }, [routeHistory, pathname]);

  const onProfileClick = useCallback(() => {
    routeHistory('/profile');
  }, [routeHistory]);

  const onSignInClick = useCallback(() => {
    routeHistory(`${pathname}/signin`);
  }, [routeHistory, pathname]);

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
                <img src={logo} alt="logo" width="70px" height="70px" />
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
                      pathname.includes('/ranking') && 'link-selected'
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
            {auth.isLoggedin ? (
              <>
                <LogoutBtn onClick={onSignOutClick}>로그아웃</LogoutBtn>
                <UserProfile onClick={onProfileClick}>
                  <ProfileImage
                    src={
                      auth.image.length > 0
                        ? auth.image
                        : process.env.REACT_APP_IMAGE_DEFAULT_USER
                    }
                    alt="프로필사진"
                  />
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
