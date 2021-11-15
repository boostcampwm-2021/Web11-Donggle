import React from 'react';

import {
  BallWrapper,
  Balls,
  Balls_1,
  Balls_2,
  Balls_3,
  Balls_4,
  Balls_5,
  Balls_6,
  Balls_7,
  Balls_8,
} from './index.style';

const LoadAnimation: React.FC = () => {
  return (
    <BallWrapper>
      <Balls>
        <Balls_1 />
        <Balls_2 />
        <Balls_3 />
        <Balls_4 />
      </Balls>
      <Balls>
        <Balls_5 />
        <Balls_6 />
        <Balls_7 />
        <Balls_8 />
      </Balls>
    </BallWrapper>
  );
};

export default LoadAnimation;
