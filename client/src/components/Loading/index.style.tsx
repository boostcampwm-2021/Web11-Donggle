// https://wsss.tistory.com/1214 참고
import styled, { keyframes } from 'styled-components';

const ball = keyframes`
    0%, 25%{ top: -50px; }
    35%{ top: calc(60% - 50px ); }
    40%{ top: calc(45% - 50px ); }
    45%{ top: calc(55% - 50px ); }
    50%, 70%{ top: calc(50% - 25px); }
    80%, 100%{ top: 100%; }
`;

export const BallWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 360px;
  height: 100vh;
  position: relative;
`;

export const Balls = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
`;

const Ball = styled.div`
  position: absolute;
  top: -50px;
  width: 50px;
  height: 50px;
  background: peru;
  border-radius: 50%;
  margin: 0 20px;
  animation: ${ball} 4s infinite;
`;

const Balls1 = styled(Ball)`
  background-image: linear-gradient(to bottom, #477a62, #33ab74);
`;
const Balls2 = styled(Ball)`
  background-image: linear-gradient(to bottom, #33ab74, #a9e884);
`;

const Balls3 = styled(Ball)`
  background-image: linear-gradient(to bottom, #a9e884, #00bdfb);
`;

const Balls4 = styled(Ball)`
  background-image: linear-gradient(to bottom, #00bdfb, #005672);
`;

export const Balls_1 = styled(Balls1)`
  left: 20px;
  animation-delay: 0;
`;
export const Balls_2 = styled(Balls2)`
  left: 100px;
  animation-delay: 0.05s;
`;
export const Balls_3 = styled(Balls3)`
  left: 180px;
  animation-delay: 0.1s;
`;
export const Balls_4 = styled(Balls4)`
  left: 260px;
  animation-delay: 0.15s;
`;
export const Balls_5 = styled(Balls1)`
  left: 20px;
  animation-delay: 2s;
`;
export const Balls_6 = styled(Balls2)`
  left: 100px;
  animation-delay: 2.05s;
`;
export const Balls_7 = styled(Balls3)`
  left: 180px;
  animation-delay: 2.1s;
`;
export const Balls_8 = styled(Balls4)`
  left: 260px;
  animation-delay: 2.15s;
`;
