import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from '@components/Common/Modal/index';
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
import { ICategories, IReviewSubmit } from '@myTypes/Review';
import { useRecoilValue } from 'recoil';
import { authState } from '@stores/atoms';

import React, { useCallback, useEffect, useState } from 'react';
import useHistoryRouter from '@hooks/useHistoryRouter';

const ReviewModal: React.FC = () => {
  const DEFAULT_ADDRESS = '대전광역시 서구 탄방동';
  const [history, routeHistory] = useHistoryRouter();
  const [reviewData, setReviewData] = useState<IReviewSubmit>({
    address: useRecoilValue(authState).address || DEFAULT_ADDRESS,
    user: 'testUser',
    text: '',
    categories: {
      safety: 1,
      traffic: 1,
      food: 1,
      entertainment: 1,
    },
  });

  const setText = useCallback((text: string) => {
    setReviewData((prevData) => {
      return { ...prevData, text: text.slice(0, 400) };
    });
  }, []);

  const setCategoryRate = useCallback(
    (category: keyof ICategories, rate: number) => {
      setReviewData((prevData) => {
        return {
          ...prevData,
          categories: { ...prevData.categories, [category]: rate },
        };
      });
    },
    [],
  );

  const submitHandler = (e) => {
    e.preventDefault();
    submitReview(reviewData, routeHistory);
  };

  const RatingStars = (Object.keys(Category) as (keyof typeof Category)[]).map(
    (category) => {
      return (
        <DynamicStarRateDiv
          key={category}
          category={category}
          name={Category[category]}
          rate={reviewData.categories[category]}
          setCategoryRate={setCategoryRate}
        ></DynamicStarRateDiv>
      );
    },
  );

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
          value={reviewData.text}
        ></TextInput>
        <p
          style={{
            position: 'absolute',
            right: '75px',
            bottom: '-10px',
            color: 'red',
          }}
        >
          {reviewData.text.length} / 400
        </p>
      </TextAreaDiv>
      <SubmitDiv>
        <SubmitBtn onClick={submitHandler}>제출하기</SubmitBtn>
      </SubmitDiv>
    </Modal>
  );
};

export default ReviewModal;
