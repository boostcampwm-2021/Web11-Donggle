import styled from 'styled-components';

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

export { HashTag };
