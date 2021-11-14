import Modal from '@components/Modal/index';
import Searchbar from '@components/Searchbar/index';
import {
  TitleWrapper,
  ButtonWrapper,
  SubmitButton,
} from '@components/AddressModal/index.style';

import React, { useState } from 'react';

interface AddressModalProps {
  title: string;
  onSubmitHandler;
  onCancelHandler;
}

const AddressModal: React.FC<AddressModalProps> = ({
  title,
  onSubmitHandler,
  onCancelHandler,
}) => {
  const [mapInfo, setMapInfo] = useState({});

  const onClickHandler = (mapInfo: MapInfo) => {
    setMapInfo(mapInfo);
  };

  return (
    <Modal>
      <TitleWrapper>{title}</TitleWrapper>
      <Searchbar onClickHandler={onClickHandler} />
      <ButtonWrapper>
        <SubmitButton cancel={false} onClick={() => onSubmitHandler(mapInfo)}>
          제출
        </SubmitButton>
        <SubmitButton cancel={true} onClick={onCancelHandler}>
          취소
        </SubmitButton>
      </ButtonWrapper>
    </Modal>
  );
};

export default AddressModal;
