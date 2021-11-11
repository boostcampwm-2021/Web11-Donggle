import styled from 'styled-components';

const ImageUsernameWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
`;

const ImageWrapper = styled.div`
  width: 360px;
  height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: solid 1px #c5c5c5;
`;

const UserImage = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 999px;
`;

const ImageUploadButton = styled.button`
  width: 200px;
  height: 60px;
  margin-top: 10px;
  border-radius: 10px;
  background: #33ab74;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
`;

const ImageRemoveButton = styled.button`
  width: 200px;
  height: 60px;
  margin-top: 10px;
  border-radius: 10px;
  background: #fff;
  color: #33ab74;
  font-size: 20px;
  cursor: pointer;
`;

const UsernameWrapper = styled.div`
  width: 600px;
  height: 460px;
  font-size: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddressWrapper = styled.div`
  width: 900px;
  height: 200px;
  margin-top: 20px;
  background: green;
`;

export {
  ImageUsernameWrapper,
  ImageWrapper,
  UserImage,
  ImageUploadButton,
  ImageRemoveButton,
  UsernameWrapper,
  AddressWrapper,
};
