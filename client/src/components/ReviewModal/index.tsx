import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import Modal from '@components/modal';
import {
  TitleDiv,
  StarRateDiv,
  TextAreaDiv,
  TextInput,
  SubmitDiv,
  SubmitBtn,
} from './index.style';
import DynamicStarRateDiv from '@components/Common/DynamicStarRate';
import { Category } from '@utils/enum';

const ReviewModal: React.FC = () => {
  const [content, setContent] = useState('');

  const RatingStars = (Object.keys(Category) as (keyof typeof Category)[]).map(
    (category, idx) => {
      return (
        <DynamicStarRateDiv
          key={idx}
          category={Category[category]}
        ></DynamicStarRateDiv>
      );
    },
  );

  const setText = useCallback((text: string) => {
    setContent(text.slice(0, 400));
  }, []);

  return (
    <Modal>
      <TitleDiv>
        <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
        <span style={{ marginLeft: '10px' }}>경기도 성남시 분당구 판교동</span>
      </TitleDiv>
      <StarRateDiv>{RatingStars}</StarRateDiv>
      <TextAreaDiv>
        <TextInput
          placeholder="후기를 작성해주세요.(선택, 400자 이내)"
          rows={3}
          cols={20}
          onChange={(e) => setText(e.target.value)}
          value={content}
        ></TextInput>
        <p
          style={{
            position: 'absolute',
            right: '75px',
            bottom: '-10px',
            color: 'red',
          }}
        >
          {content.length} / 400
        </p>
      </TextAreaDiv>
      <SubmitDiv>
        <SubmitBtn>제출하기</SubmitBtn>
      </SubmitDiv>
    </Modal>
  );
};

export default ReviewModal;
