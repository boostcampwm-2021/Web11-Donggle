import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const Layout = styled.div.attrs((props: { sidebar: boolean | null }) => props)`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100vh;
  right: 0;
  z-index: 1;
  overflow-y: scroll;
  background-color: white;
  transform: translateX(400px);

  transition: all ease 0.3s 0s;
  padding-bottom: 6.3em;
  &.open {
    transform: translateX(0px);
  }
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 8px;
    background-color: ${(props) => props.theme.colors.lightgrey};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.ashgrey};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.lightgrey};
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const WrapperDiv = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
  justify-content: space-between;
  align-items: center;
  line-height: 40px;

  &:after {
    content: ' ';
  }
`;

const SpanText = styled.span`
  display: block;
  font-size: 18px;
`;

const EmptySpan = styled(SpanText)`
  min-height: 100%;
  padding-right: 1px;
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
  font-size: 35px;
  font-weight: bold;
  margin-right: 40px;
`;

const RateStarDiv = styled(RateNumStarDiv)`
  width: fit-content;
  position: relative;
  overflow: hidden;
  box-sizing: content-box;
`;

const RateStarBaseDiv = styled.div`
  color: ${(props) => props.theme.colors.lightgrey};
  z-index: 0;
  padding: 0;
  position: absolute;
  left: 0px;
`;

const RateStarFillDiv = styled.div<{ starRate: number }>`
  color: gold;
  padding: 0;
  position: relative;
  z-index: 1;
  display: flex;
  width: ${(props) => props.starRate * 20}%;
  overflow: hidden;
`;

const RateCategoryDiv = styled(RateNumStarDiv)`
  flex-direction: column;
  height: 100%;
`;

const RateCategoryGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  margin-top: 10px;
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
  position: relative;
  left: 105%;
  font-size: 12px;
`;

const HashTagDiv = styled(WrapperDiv)`
  position: relative;
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

const MenuBarDiv = styled(WrapperDiv)`
  position: relative;
  width: 100%;
  justify-content: start;
`;

const Menu = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: ${(props) => props.theme.colors.black};
  height: 100%;
  margin: 0 15px;
  &.menu-selected {
    font-weight: bold;
    color: ${(props) => props.theme.colors.green};
    border-bottom: 1px solid ${(props) => props.theme.colors.green};
  }
  cursor: pointer;
`;

const ContentDiv = styled(WrapperDiv)`
  position: relative;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  line-height: 1;
`;

const Content = styled(WrapperDiv)`
  width: 100%;
  height: 100px;
`;

const AddButtonDiv = styled(WrapperDiv)`
  position: relative;
  width: 100%;
  height: fit-content;
  margin: 10px 0px;
  justify-content: center;
  line-height: 1;
  background-color: ${(props) => props.theme.colors.lightgrey};
`;

const AddButton = styled.button`
  width: 100%;
  border: none;
  font-size: 20px;
  background-color: transparent;
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
`;

export {
  Container,
  Layout,
  WrapperDiv,
  SpanText,
  EmptySpan,
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
  MenuBarDiv,
  Menu,
  ContentDiv,
  Content,
  AddButtonDiv,
  AddButton,
};
