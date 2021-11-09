import styled from 'styled-components';

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
  -webkit-transition: all ease 0.3s 0s;
  transition: all ease 0.3s 0s;
  &.open {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
`;

const WrapperDiv = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
  justify-content: space-between;
  align-items: center;
  line-height: 60px;

  &:after {
    content: ' ';
  }
`;

const SpanText = styled.span`
  display: block;
  font-size: 18px;
`;

const SpanBackArrow = styled(SpanText)<{ onClick: () => void }>`
  font-size: 20px;
  text-align: left;
  margin-left: 10px;
  cursor: pointer;
`;

const SpanTitle = styled(SpanText)`
  font-weight: bold;
  font-size: 15px;
  text-align: center;
`;

const SpanReviewTitle = styled(SpanTitle)`
  width: 100%;
  line-height: 40px;
`;

const RateDiv = styled(WrapperDiv)`
  flex-direction: column;
  width: 100%;
  padding: 0 60px;
`;

const RateNumStarDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const RateSpanText = styled(SpanText)`
  display: block;
  width: 10%;
  font-size: 34px;
  font-weight: bold;
  margin-right: 50px;
`;

const RateStarDiv = styled(RateNumStarDiv)`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const RateStarBaseDiv = styled.div`
  color: ${(props) => props.theme.colors.lightgrey};
  z-index: 0;
  padding: 0;
  position: relative;
  top: 0px;
  left: 0px;
`;

const RateStarFillDiv = styled.div<{ starRate: number }>`
  color: gold;
  padding: 0;
  position: absolute;
  z-index: 1;
  left: 0.5px;
  display: flex;
  width: ${(props) => props.starRate * 12 - 1}%;
  overflow: hidden;
  -webkit-text-fill-color: gold;
`;

const RateCategoryDiv = styled(RateNumStarDiv)`
  flex-direction: column;
  height: 100%;
`;

const RateCategoryGroup = styled.div`
  width: 100%;
  display: flex;
  line-height: 1;
  flex-direction: column;
  justify-content: start;
`;

const RateCategoryTitle = styled(SpanText)`
  font-size: 12px;
`;

const RateCategoryUnit = styled.div`
  width: 80%;
  height: 6px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${(props) => props.theme.colors.lightgrey};
  border-radius: 5px;
  margin: 5px 0 15px 0;
`;

const RateCategoryBar = styled.span<{ categoryRate: number }>`
  position: absolute;
  left: 0px;
  top: 0px;
  height: 6px;
  width: ${(props) => props.categoryRate * 20}%;
  background-color: ${(props) => props.theme.colors.green};
  border-radius: 3px;
  z-index: 1;
`;

const RateCategoryNum = styled(SpanText)`
  position: absolute;
  left: 105%;
  font-size: 12px;
`;

const HashTagDiv = styled(WrapperDiv)`
  width: 100%;
  padding: 10px 60px;
  flex-wrap: wrap;
  justify-content: start;
`;

const HashTag = styled.span`
  display: inline-block;
  border: 1px solid ${(props) => props.theme.colors.green};
  color: ${(props) => props.theme.colors.darkblue};
  font-size: 10px;
  border-radius: 10px;
  line-height: 1;
  padding: 6px;
  margin: 2px 3px;
  box-sizing: content-box;
  white-space: nowrap;
`;

export {
  Layout,
  WrapperDiv,
  SpanText,
  SpanBackArrow,
  SpanTitle,
  SpanReviewTitle,
  RateDiv,
  RateSpanText,
  RateNumStarDiv,
  RateStarDiv,
  RateStarBaseDiv,
  RateStarFillDiv,
  RateCategoryDiv,
  RateCategoryGroup,
  RateCategoryTitle,
  RateCategoryUnit,
  RateCategoryBar,
  RateCategoryNum,
  HashTagDiv,
  HashTag,
};
