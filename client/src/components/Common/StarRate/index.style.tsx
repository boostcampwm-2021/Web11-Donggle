import styled from 'styled-components';

const BaseDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 40px;
`;

const RateNumStarDiv = styled(BaseDiv)`
  justify-content: start;
`;

const RateSpanText = styled.span<{ isLarge: boolean }>`
  font-size: ${(props) => (props.isLarge ? 35 : 18)}px;
  font-weight: bold;
  margin-right: ${(props) => (props.isLarge ? 20 : 15)}px;
`;

const RateStarDiv = styled(RateNumStarDiv)`
  width: fit-content;
  position: relative;
  overflow: visible;
  box-sizing: content-box;
`;

const RateStarBaseDiv = styled.div`
  color: ${(props) => props.theme.colors.lightgrey};
  z-index: 0;
  padding: 0;
  position: absolute;
  left: 0px;
`;

const RateStarFillDiv = styled.div<{ rate: number }>`
  color: gold;
  padding: 0;
  position: relative;
  bottom: 2px;
  z-index: 1;
  display: flex;
  width: ${(props) => props.rate * 20}%;
  overflow: hidden;
`;

export {
  RateNumStarDiv,
  RateSpanText,
  RateStarDiv,
  RateStarBaseDiv,
  RateStarFillDiv,
};
