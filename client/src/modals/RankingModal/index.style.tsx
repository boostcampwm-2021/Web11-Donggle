import styled from 'styled-components';

const RankbarList = styled.div`
  width: 100%;
  height: 290px;
  padding: 0 10px;
  > *:not(:last-child) {
    margin-bottom: 8px;
  }
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme?.colors?.lightgrey ?? '#70C49D'};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme?.colors?.ashgrey ?? '#666362'};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme?.colors?.lightgrey ?? '#70C49D'};
    border-radius: 5px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const SelectorWrapper = styled.div`
  ${({ theme }) =>
    theme.common?.flexRow ??
    `
    display: flex;
    flex-direction: row;
    align-items: center;
  `};
  justify-content: end;

  width: 100%;
  padding: 10px 15px;
  > *:not(:last-child) {
    margin-right: 8px;
  }
`;

const TitleText = styled.div`
  ${({ theme }) =>
    theme.common?.flexRow ??
    `
    display: flex;
    flex-direction: row;
    align-items: center;
  `};
  > *:not(:last-child) {
    margin-right: 8px;
  }
  padding-bottom: 10px;
  margin: 0 auto;
  font-size: ${({ theme }) => theme.fontSizes?.paragraph || '18px'};
  font-weight: bold;
`;

export { SelectorWrapper, RankbarList, TitleText };
