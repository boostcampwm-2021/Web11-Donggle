import React from 'react';

import { HashTag } from './index.style';

interface IProps {
  hashTags: string[];
}

const HashTagList: React.FC<IProps> = ({ hashTags }) => {
  return (
    <>
      {hashTags.map((hashTag: string) => (
        <HashTag key={hashTag}>{hashTag}</HashTag>
      ))}
    </>
  );
};

export default HashTagList;
