import Modal from '@components/Common/Modal';
import Rankbar from './Rankbar';

import React from 'react';

const categoriesEx = {
  safety: 4.3,
  traffic: 2.5,
  food: 3.3,
  entertainment: 3.2,
};

const RankingModal: React.FC = () => {
  return (
    <Modal>
      <Rankbar rank={77} address="분당구" categories={categoriesEx} />
    </Modal>
  );
};

export default RankingModal;
