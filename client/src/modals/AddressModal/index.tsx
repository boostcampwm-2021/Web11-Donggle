import Modal from '@components/Common/Modal/index';
import Searchbar from '@components/Searchbar/index';
import {
  TitleWrapper,
  ButtonWrapper,
  SubmitButton,
  ModalSizer,
} from './index.style';
import { IMapInfo } from '@myTypes/Map';

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
  const [mapInfo, setMapInfo] = useState<IMapInfo>({} as IMapInfo);

  const onClickHandler = (mapInfo: IMapInfo) => {
    setMapInfo(mapInfo);
  };

  return (
    <Modal>
      <ModalSizer>
        <TitleWrapper>{title}</TitleWrapper>
        <Searchbar
          onClickHandler={onClickHandler}
          valueState={mapInfo.address}
          onlyDong={true}
        />
      </ModalSizer>
      <ButtonWrapper>
        <SubmitButton
          cancel={false}
          onClick={async () => {
            await onSubmitHandler(mapInfo);
          }}
        >
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
