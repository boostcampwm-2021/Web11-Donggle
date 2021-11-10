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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';

// export interface MainIProps {
//   showSidebar(): void;
//   hideSidebar(): void;
// }

const Header: React.FC = withRouter(({ history, location }) => {
  const [clickedLinkBtnId, setClickedLinkBtnId] = useState('/');
  const [isAuth, setIsAuth] = useRecoilState(authState);

  // const openSideBar = useCallback(() => {
  //   console.log('test');
  //   props.showSidebar();
  // }, []);

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
              <LinkBtn
                onClick={() => routeHistory('/', {})}
                className={`${clickedLinkBtnId === '/' && 'link-selected'}`}
              >
                <img src={logo} alt="logo" width="70px" />
              </LinkBtn>
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
            </MenuWrapper>
          </LogoMenuContainer>
          <ProfileWrapper>
            {isAuth ? (
              <>
                <LogoutBtn>로그아웃</LogoutBtn>
                <UserProfile>
                  <FontAwesomeIcon icon={faUserCircle} size="3x" color="grey" />
                </UserProfile>
              </>
            ) : (
              <LoginBtn
                onClick={() => routeHistory('/login', { background: location })}
              >
                로그인
              </LoginBtn>
            )}
          </ProfileWrapper>
        </Background>
      </Layout>
      <ColorBar></ColorBar>
    </>
  );
});

export default Header;
