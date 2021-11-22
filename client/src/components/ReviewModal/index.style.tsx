import styled from 'styled-components';

const BaseDiv = styled.div`
  position: relative;
  width: 100%;
  ${(props) => props.theme.flexRow};
  justify-content: center;
`;

const TitleDiv = styled(BaseDiv)`
  font-size: ${(props) => props.theme.paragraph};
  text-align: center;
`;

const StarRateDiv = styled.div`
  margin-top: 15px;
  width: 100%;
  position: relative;
  ${(props) => props.theme.flexColumn};
  justify-content: center;
  align-items: center;
`;

const TextAreaDiv = styled(BaseDiv)`
  margin-top: 15px;
  position: relative;
  ${(props) => props.theme.flexRow};
  justify-content: center;
`;

const TextInput = styled.textarea`
  display: block;
  width: 70%;
  height: 100px;
  margin: auto;
  padding: 0 30px 50px 0px;
  border: 1px solid ${(props) => props.theme.colors.lightgrey};
  border-radius: 5px;
  resize: none;
  line-height: 24px;
`;

const HashTagWrapper = styled.div`
  width: 70%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const SubmitDiv = styled(BaseDiv)`
  margin-top: 15px;
`;

const SubmitBtn = styled.button`
  display: block;
  margin: auto;
  width: 70%;
  padding: 10px 0px;
  border: none;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.lightgreen};
  cursor: pointer;
  border-radius: 10px;

  :hover {
    background-color: ${(props) => props.theme.colors.green};
  }
`;

export {
  TitleDiv,
  StarRateDiv,
  TextAreaDiv,
  TextInput,
  HashTagWrapper,
  SubmitDiv,
  SubmitBtn,
};
