import styled from 'styled-components';

const BaseBtn = styled.button`
  display: block;
  border: none;
  font-size: 14px;
  background-color: transparent;
  color: ${(props) => props.theme.colors.ashgrey};
  cursor: pointer;

  &:after {
    margin-left: 10px;
`;

const OpenDetailBtn = styled(BaseBtn)`
  &:after {
    content: '⇣';
  }
`;

const CloseDetailBtn = styled(BaseBtn)`
  &:after {
    content: '⇡';
  }
`;

export { OpenDetailBtn, CloseDetailBtn };
