import React from 'react';

import { HashTag } from './index.style';

interface IProps {
  hashTags: string[];
}

const HashTagList: React.FC<IProps> = ({ hashTags }) => {
  return (
    <>
      {hashTags.map((hashTag: string, idx) => (
        <HashTag key={idx}>{hashTag}</HashTag>
      ))}
    </>
  );
};

export default HashTagList;
