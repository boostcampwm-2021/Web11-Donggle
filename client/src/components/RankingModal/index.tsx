import Modal from '@components/Common/Modal';
import Rankbar from './Rankbar';

import React from 'react';
import { RankbarList } from './index.style';

const exampleData = [
  {
    address: '서울특별시 도봉구',
    categories: {
      safety: 4.3,
      traffic: 2.5,
      food: 3.3,
      entertainment: 3.2,
    },
  },
  {
    address: '서울특별시 노원구',
    categories: {
      safety: 4.4,
      traffic: 2.6,
      food: 3.4,
      entertainment: 3.3,
    },
  },
  {
    address: '서울특별시 동대문구',
    categories: {
      safety: 4.5,
      traffic: 2.6,
      food: 3.5,
      entertainment: 3.4,
    },
  },
  {
    address: '서울특별시 중랑구',
    categories: {
      safety: 4.2,
      traffic: 2.4,
      food: 3.2,
      entertainment: 3.1,
    },
  },
  {
    address: '서울특별시 강서구',
    categories: {
      safety: 4.1,
      traffic: 2.3,
      food: 3.1,
      entertainment: 3,
    },
  },
  {
    address: '서울특별시 강남구',
    categories: {
      safety: 3.9,
      traffic: 2.2,
      food: 3,
      entertainment: 2.9,
    },
  },
  {
    address: '서울특별시 마포구',
    categories: {
      safety: 4.8,
      traffic: 4.6,
      food: 3.1,
      entertainment: 3.4,
    },
  },
  {
    address: '서울특별시 중구',
    categories: {
      safety: 1.2,
      traffic: 2.3,
      food: 1.8,
      entertainment: 1.3,
    },
  },
  {
    address: '서울특별시 용산구',
    categories: {
      safety: 1.1,
      traffic: 4.5,
      food: 4.9,
      entertainment: 4.8,
    },
  },
];

const RankingModal: React.FC = () => {
  return (
    <Modal>
      <RankbarList>
        {exampleData.map(({ address, categories }, idx) => (
          <Rankbar
            key={idx}
            rank={idx + 1}
            address={address}
            categories={categories}
          />
        ))}
      </RankbarList>
    </Modal>
  );
};

export default RankingModal;
