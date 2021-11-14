import Modal from '@components/Modal/index';
import Searchbar from '@components/Searchbar/index';
import {
  TitleWrapper,
  ButtonWrapper,
  SubmitButton,
} from '@components/AddressModal/index.style';

import React from 'react';

interface AddressModalProps {
  title: string;
  onClickHandler: (mapInfo: MapInfo) => void | Promise<void>;
  onSubmitHandler;
  onCancelHandler;
}

const AddressModal: React.FC<AddressModalProps> = ({
  title,
  onClickHandler,
  onSubmitHandler,
  onCancelHandler,
}) => {
  return (
    <Modal>
      <TitleWrapper>{title}</TitleWrapper>
      <Searchbar onClickHandler={onClickHandler} />
      <ButtonWrapper>
        <SubmitButton cancel={false} onClick={onSubmitHandler}>
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
