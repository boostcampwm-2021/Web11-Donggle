import styled from 'styled-components';

const BaseDiv = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  line-height: 40px;
`;

const RateStarDiv = styled(BaseDiv)`
  width: 100%;
  justify-content: center;
  position: relative;
  overflow: hidden;
  color: ${(props) => props.theme.colors.lightgrey};
`;

const RateStarFillDiv = styled.div<{ rate: number }>`
  color: gold;
  padding: 0;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  width: ${(props) => props.rate * 20}%;
  overflow: hidden;
`;

const CategorySpanDiv = styled(BaseDiv)`
  width: 50%;
  padding-left: 100px;
`;

const CategorySpan = styled.span`
  display: block;
  width: 100%;
  font-size: 15px;
  color: ${(props) => props.theme.colors.ashgrey};
  text-align: center;
  font-weight: bold;
`;

const StarRateDiv = styled(BaseDiv)`
  justify-content: center;
  padding-right: 100px;

  &.fa-star: {
    &:hover: {
      color: gold;
    }
  }
`;

const StarBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  margin: 2px;
  padding: 0px;
`;

export {
  BaseDiv,
  RateStarDiv,
  RateStarFillDiv,
  CategorySpanDiv,
  CategorySpan,
  StarRateDiv,
  StarBtn,
};
