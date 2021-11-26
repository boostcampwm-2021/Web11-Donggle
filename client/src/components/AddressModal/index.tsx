import Modal from '@components/Common/Modal/index';
import Searchbar from '@components/Searchbar/index';
import {
  TitleWrapper,
  ButtonWrapper,
  SubmitButton,
  ModalSizer,
} from '@components/AddressModal/index.style';
import { IMapInfo } from '@myTypes/Map';

import React, { useCallback, useState } from 'react';

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

  const onSubmitClick = useCallback(async () => {
    await onSubmitHandler(mapInfo);
  }, [onSubmitHandler, mapInfo]);

  const onItemClick = useCallback((mapInfo: IMapInfo) => {
    setMapInfo(mapInfo);
  }, []);

  return (
    <Modal>
      <ModalSizer>
        <TitleWrapper>{title}</TitleWrapper>
        <Searchbar
          onClickHandler={onItemClick}
          valueState={mapInfo.address}
          onlyDong={true}
        />
      </ModalSizer>
      <ButtonWrapper>
        <SubmitButton cancel={false} onClick={onSubmitClick}>
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
