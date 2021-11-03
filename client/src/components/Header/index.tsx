import React from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '@stores/atoms';
import logo from '@assets/images/logo.png';
import {
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

const Header: React.FC = ({}) => {
  const [isAuth, setIsAuth] = useRecoilState(authState);

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
                  <a>동네 지도</a>
                </Menu>
                <Menu>
                  <a>동네 후기</a>
                </Menu>
                <Menu>
                  <a>동네 랭킹</a>
                </Menu>
              </MenuList>
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
};

export default Header;
