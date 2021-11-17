import styled from 'styled-components';

const Layout = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: calc(100% - ${(props) => props.theme.componentSize.header});
  right: 0;
  z-index: 1;
  overflow-y: scroll;
  background-color: white;
  transform: translateX(400px);

  transition: all ease 0.3s 0s;
  &.open {
    transform: translateX(0px);
  }
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 10px;
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

const BaseDiv = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
  justify-content: space-between;
  align-items: center;
  line-height: 40px;
`;

const TitleDiv = styled(BaseDiv)`
  background-color: ${(props) => props.theme.colors.whitesmoke};
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

const RateDiv = styled(BaseDiv)`
  flex-direction: column;
  width: 100%;
  padding-left: 60px;
`;

const HashTagDiv = styled(BaseDiv)`
  position: relative;
  width: 100%;
  padding: 10px 55px;
  flex-wrap: wrap;
  justify-content: start;
`;

const MenuBarDiv = styled(BaseDiv)`
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

const ReviewContentDiv = styled(BaseDiv)`
  position: relative;
  flex-direction: column;
  justify-content: center;
`;

const AddButtonDiv = styled(BaseDiv)`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 10px 0px;
  background-color: ${(props) => props.theme.colors.lightgreen};
`;

const AddButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 14px;
  font-weight: bold;
  background-color: transparent;
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
`;

export {
  Layout,
  TitleDiv,
  SpanText,
  EmptySpan,
  SpanBackArrow,
  SpanTitle,
  SpanReviewTitle,
  RateDiv,
  HashTagDiv,
  MenuBarDiv,
  Menu,
  ReviewContentDiv,
  AddButtonDiv,
  AddButton,
};
