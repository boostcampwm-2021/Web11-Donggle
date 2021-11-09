import React from 'react';

import { Layout, SidebarWrapper } from './index.style';

interface IProps {
  sidebar: boolean | null;
}

const Sidebar: React.FC<IProps> = (props: IProps) => {
  return (
    <Layout
      className={`${props.sidebar ? 'open' : ''}`}
      sidebar={props.sidebar}
    >
      <span>test</span>
    </Layout>
  );
};

export default Sidebar;
