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
  height: 100%;
  font-size: 18px;
`;

const SpanBackArrow = styled(SpanText)`
  font-size: 20px;
  text-align: left;
  margin-left: 10px;
`;

const SpanTitle = styled(SpanText)`
  font-weight: bold;
  font-size: 15px;
  text-align: center;
`;

const SpanReviewTitle = styled(SpanTitle)`
  width: 100%;
  line-height: 50px;
`;

const RateDiv = styled(WrapperDiv)`
  flex-direction: column;
  width: 100%;
  height: 290px;
  padding: 10px 100px;
`;

const RateNumStarDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const RateSpanText = styled(SpanText)`
  font-size: 34px;
  font-weight: bold;
  margin-right: 20px;
`;

const RateStarDiv = styled.div`
  width: 100%;
`;

// const RateStarSpan = styled

const SidebarWrapper = styled.div`
  display: relative;
  width: 100%;
  height: 100%;
  background-color: red;
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
};
