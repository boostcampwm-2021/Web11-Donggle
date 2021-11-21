import styled from 'styled-components';

const BaseDiv = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  line-height: 40px;
`;

const SpanText = styled.span`
  display: block;
  font-size: 18px;
`;

const ContentWrapper = styled(BaseDiv)`
  height: auto;
  flex-direction: column;
`;

const ContentDiv = styled(BaseDiv)`
  position: relative;
  padding-bottom: 20px;
  flex-direction: column;
  justify-content: center;
  line-height: 22px;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
`;

const ContentTopDiv = styled(BaseDiv)`
  display: flex;
  width: 90%;
  justify-content: space-between;
`;

const ContentTopTextDiv = styled(BaseDiv)`
  display: flex;
  justify-content: flex-end;
`;

const DateText = styled(SpanText)`
  font-size: 12px;
  margin-right: 10px;
  color: ${(props) => props.theme.colors.ashgrey};
`;

const UserText = styled(SpanText)`
  font-size: 12px;
  color: ${(props) => props.theme.colors.ashgrey};
`;

const ContentTextDiv = styled(BaseDiv)`
  width: 90%;
  font-size: 12px;
  border-bottom: none;
  line-height: 22px;
  color: ${(props) => props.theme.colors.ashgrey};
`;

const ContentBottomDiv = styled(BaseDiv)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: none;
  margin-top: 25px;
`;

const RateDiv = styled(BaseDiv)`
  flex-direction: column;
  width: 100%;
  border-bottom: none;
`;

const EmptyDiv = styled(BaseDiv)`
  color: ${(props) => props.theme.colors.ashgrey};
  height: 200px;
  opacity: 0.7;
  justify-content: center;
  &:before {
    content: &#1F625;
  }
`;

export {
  ContentWrapper,
  ContentDiv,
  ContentTopDiv,
  ContentTopTextDiv,
  DateText,
  UserText,
  ContentTextDiv,
  ContentBottomDiv,
  RateDiv,
  EmptyDiv,
};
