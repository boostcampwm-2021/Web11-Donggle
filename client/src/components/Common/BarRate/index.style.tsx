import styled from 'styled-components';

const BaseDiv = styled.div`
  position: relative;
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
`;

const RateCategoryDiv = styled(BaseDiv)`
  flex-direction: column;
`;

const RateCategoryGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  justify-content: start;
`;

const RateCategoryTitle = styled.span`
  font-size: 12px;
  line-height: 1;
`;

const RateCategoryUnit = styled.div`
  width: 90%;
  height: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: ${(props) => props.theme.colors.lightgrey};
  border-radius: 5px;
  margin: 5px 0 15px 0;
`;

const RateCategoryBar = styled.span<{ rate: number }>`
  height: 6px;
  width: ${(props) => props.rate * 20}%;
  background-color: ${(props) => props.theme.colors.green};
  border-radius: 3px;
  z-index: 1;
`;

const RateCategoryNum = styled(RateCategoryTitle)`
  position: relative;
  left: 25px;
`;

export {
  RateCategoryDiv,
  RateCategoryGroup,
  RateCategoryTitle,
  RateCategoryUnit,
  RateCategoryBar,
  RateCategoryNum,
};
