import styled from 'styled-components';

const RowFlexDiv = styled.div`
  ${({ theme }) =>
    theme.common?.flexRow ??
    `
    display: flex;
    flex-direction: row;
    align-items: center;
  `};
  justify-content: space-between;
  flex-grow: 1;
`;

const BarLayout = styled(RowFlexDiv)`
  width: 100%;
  padding: 5px 10px;
  > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const RankbarDiv = styled(BarLayout)`
  background-color: ${({ theme }) => theme.colors?.lightgreen ?? '#33AB74'};
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
`;

const RankSpan = styled.span`
  min-width: 30px;
  text-align: right;
`;

export { RankbarDiv, BarLayout, RankSpan };
