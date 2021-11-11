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
import { submitReview } from '@controllers/reviewController';

interface ReviewType extends CategoryRateType {
  address: string;
  content: string;
}

const ReviewModal: React.FC = () => {
  const DEFAULT_ADDRESS = '대전시 서구 탄방동';
  const [reviewData, setReviewData] = useState<ReviewType>({
    address: DEFAULT_ADDRESS,
    content: '',
    categories: {
      safety: 0,
      traffic: 0,
      food: 0,
      entertainment: 0,
    },
  });

  const setText = useCallback((text: string) => {
    setReviewData((prevData) => {
      return { ...prevData, content: text.slice(0, 400) };
    });
  }, []);

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

  const submitHandler = (e) => {
    e.preventDefault();
    submitReview(reviewData);
  };

  return (
    <Modal>
      <TitleDiv>
        <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
        <span style={{ marginLeft: '10px' }}>{DEFAULT_ADDRESS}</span>
      </TitleDiv>
      <StarRateDiv>{RatingStars}</StarRateDiv>
      <TextAreaDiv>
        <TextInput
          placeholder="후기를 작성해주세요.(선택, 400자 이내)"
          rows={3}
          cols={20}
          onChange={(e) => setText(e.target.value)}
          value={reviewData.content}
        ></TextInput>
        <p
          style={{
            position: 'absolute',
            right: '75px',
            bottom: '-10px',
            color: 'red',
          }}
        >
          {reviewData.content.length} / 400
        </p>
      </TextAreaDiv>
      <SubmitDiv>
        <SubmitBtn onClick={submitHandler}>제출하기</SubmitBtn>
      </SubmitDiv>
    </Modal>
  );
};

export default ReviewModal;
