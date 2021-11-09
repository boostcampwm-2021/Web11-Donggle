import styled, { css } from 'styled-components';

const Layout = styled.div.attrs((props: { sidebar: boolean | null }) => props)`
  position: absolute;
  width: 400px;
  height: 100%;
  top: 0;
  right: 0px;
  z-index: 1;
  background-color: white;
  flex-direction: column;
  overflow: hidden;
  -webkit-transform: translateX(400px);
  transform: translateX(400px);
  -webkit-transition: all ease 0.7s 0s;
  transition: all ease 0.7s 0s;
  &.open {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
`;

const SidebarWrapper = styled.div`
  display: relative;
  width: 100%;
  height: 100%;
  background-color: red;
`;

export { Layout, SidebarWrapper };
