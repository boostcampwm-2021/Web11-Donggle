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
  border-right: solid 1px ${(props) => props.theme.colors.grey};
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
  background: ${(props) => props.theme.colors.lightgreen};
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  :hover {
    background: ${(props) => props.theme.colors.green};
  }
`;

const ImageRemoveButton = styled.button`
  width: 200px;
  height: 60px;
  margin-top: 10px;
  border-radius: 10px;
  background: #fff;
  color: ${(props) => props.theme.colors.lightgreen};
  font-size: 20px;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.colors.green};
  }
`;

const OauthnameWrapper = styled.div`
  margin-left: 20px;
  font-size: 20px;
  color: ${(props) => props.theme.colors.lightgreen};
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
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border-radius: 20px;
  border: solid 1px ${(props) => props.theme.colors.grey};
  font-size: 50px;
  cursor: pointer;
  :hover {
    background: ${(props) => props.theme.colors.grey};
  }
`;

export {
  ImageUsernameWrapper,
  ImageWrapper,
  UserImage,
  ImageUploadButton,
  ImageRemoveButton,
  OauthnameWrapper,
  UsernameWrapper,
  AddressWrapper,
};
