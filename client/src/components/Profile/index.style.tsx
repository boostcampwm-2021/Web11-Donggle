import styled from 'styled-components';

const ImageUsernameWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  border-right: solid 1px #c5c5c5;
  background: red;
`;

const UsernameWrapper = styled.div`
  width: 600px;
  height: 300px;
  font-size: 50px;
  background: blue;
`;

const AddressWrapper = styled.div`
  width: 900px;
  height: 200px;
  margin-top: 20px;
  background: green;
`;

export { ImageUsernameWrapper, ImageWrapper, UsernameWrapper, AddressWrapper };
