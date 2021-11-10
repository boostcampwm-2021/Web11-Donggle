import styled from 'styled-components';

export const ColumnFlex = styled.div`
  width: 300px;
  margin: 40px 40px;
  ${(props) => props.theme.common.flexColumn};
  text-align: center;
  > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const FlexButton = styled.button<{ bgColor?: string }>`
  width: 80%;
  box-sizing: border-box;
  padding: 0 10px;
  ${(props) => props.theme.common.flexRow};
  justify-content: space-between;
  background-color: ${(props) => props.bgColor ?? props.theme.colors.white};
  color: ${(props) => props.color ?? props.theme.colors.black};
  border: ${(props) => (isWhite(props.bgColor) ? 'thin solid #888' : 'none')};
  border-radius: 5px;
  cursor: pointer;
`;

export const StretchingDiv = styled.div`
  flex: 1;
  text-align: center;
`;

export const CenteredSpan = styled.span<{ height?: string }>`
  height: ${(props) => props.height ?? '40px'};
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.paragraph};
`;

const isWhite = (color?: string) => {
  if (color === undefined) return true;
  if (color === '#ffffff') return true;
  if (color === '#fff') return true;
  if (color === 'white') return true;
  return false;
};
