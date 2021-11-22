import styled from 'styled-components';

const LinkBtn = styled.button.attrs((props) => ({
  className: props.className,
}))`
  border: none;
  box-sizing: content-box;
  width: 85px;
  background-color: transparent;
  cursor: pointer;
  font-weight: normal;

  &.link-selected {
    color: #33ab74;
    font-weight: 700;
    text-decoration: solid underline #33ab74 2px;
  }
`;

const Layout = styled.div`
  position: relative;
  top: 0;
  display: flex;
  width: 100%;
  height: ${(props) => props.theme.componentSize.headerLayout};
  padding: 5px 10px;
`;

const Background = styled.div`
  position: relative;
  background: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 700px;
`;

const LogoMenuContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: start;
`;

const LogoWrapper = styled.div`
  width: 100px;
  height: 100%;
  margin-right: 10px;
  float: left;
  cursor: pointer;
`;

const MenuWrapper = styled.div`
  width: 250px;
  height: 100%;
  margin: 0;
  float: left;
`;

const MenuList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Menu = styled.li`
  margin-left: 5px;
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  width: 50%;
  height: 100%;
  justify-content: flex-end;
  display: flex;
  align-items: center;
`;

const SignInBtn = styled.button`
  border: 1px solid ${(props) => props.theme.colors.lightgreen};
  border-radius: 10px;
  background: ${(props) => props.theme.colors.white};
  min-width: 100px;
  width: fit-content;
  height: 40px;
  text-align: center;
  cursor: pointer;
  color: ${(props) => props.theme.colors.lightgreen};

  &:hover {
    color: ${(props) => props.theme.colors.green};
    border: 1px solid ${(props) => props.theme.colors.green};
  }
`;

const ReviewButton = styled(SignInBtn)`
  background: ${(props) => props.theme.colors.lightgreen};
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: ${(props) => props.theme.colors.green};
    color: ${(props) => props.theme.colors.white};
  }
`;

const LogoutBtn = styled(SignInBtn)`
  margin-right: 10px;
`;

const UserProfile = styled.div`
  margin: 0 15px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 999px;
  overflow: hidden;
`;

const ColorBar = styled.div`
  width: 100%;
  height: ${(props) => props.theme.componentSize.headerColorbar};
  background: ${(props) => props.theme.colors.lightgreen};
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export {
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
};
