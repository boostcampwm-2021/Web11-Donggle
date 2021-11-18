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
} from './index.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useHistoryRouter from '@hooks/useHistoryRouter';
import { useRecoilState } from 'recoil';

const Header: React.FC = () => {
  const [history, routeHistory] = useHistoryRouter();
  const location = useLocation();

  const [clickedLinkBtnId, setClickedLinkBtnId] = useState('/');
  const [auth, setAuth] = useRecoilState(authState);

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
                onClick={() => routeHistory('/')}
                className={`${clickedLinkBtnId === '/' && 'link-selected'}`}
              >
                <img src={logo} alt="logo" width="70px" />
              </LinkBtn>
            </LogoWrapper>
            <MenuWrapper>
              <MenuList>
                <Menu>
                  <LinkBtn
                    onClick={() => routeHistory('/')}
                    className={`${clickedLinkBtnId === '/' && 'link-selected'}`}
                  >
                    동네 지도
                  </LinkBtn>
                </Menu>
                <Menu>
                  <LinkBtn
                    onClick={() => routeHistory('/review')}
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
            </MenuWrapper>
          </LogoMenuContainer>
          <ProfileWrapper>
            {auth.isLoggedin ? (
              <>
                <ReviewButton
                  onClick={() => {
                    routeHistory('/write-review', { background: location });
                  }}
                >
                  내 동네 후기 쓰기
                </ReviewButton>
                <LogoutBtn>로그아웃</LogoutBtn>
                <UserProfile onClick={() => routeHistory('profile')}>
                  <FontAwesomeIcon icon={faUserCircle} size="3x" color="grey" />
                </UserProfile>
              </>
            ) : (
              <>
                <ReviewButton
                  onClick={() => {
                    routeHistory('/write-review', { background: location });
                  }}
                >
                  내 동네 후기 쓰기
                </ReviewButton>
                <SignInBtn
                  onClick={() =>
                    routeHistory('/signin', { background: location })
                  }
                >
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
