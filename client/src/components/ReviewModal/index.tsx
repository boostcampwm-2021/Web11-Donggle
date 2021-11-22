import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from '@components/Common/Modal/index';
import {
  TitleDiv,
  StarRateDiv,
  TextAreaDiv,
  TextInput,
  HashTagWrapper,
  SubmitDiv,
  SubmitBtn,
} from './index.style';
import DynamicStarRateDiv from '@components/Common/DynamicStarRate';
import { Category } from '@utils/enum';
import { submitReview, parseHashtags } from '@controllers/sidebarController';
import { ICategories, IReviewSubmit } from '@myTypes/Review';
import { useRecoilValue } from 'recoil';
import { authState } from '@stores/atoms';
import { HashTag } from '@components/Common/HashTag/index.style';

import React, { useCallback, useState } from 'react';
import useHistoryRouter from '@hooks/useHistoryRouter';

const ReviewModal: React.FC = () => {
  const [history, routeHistory] = useHistoryRouter();
  const [reviewData, setReviewData] = useState<IReviewSubmit>({
    address: useRecoilValue(authState).address,
    oauth_email: useRecoilValue(authState).oauth_email,
    text: '',
    categories: {
      safety: 1,
      traffic: 1,
      food: 1,
      entertainment: 1,
    },
    hashtags: [],
  });

  const setText = useCallback((text: string) => {
    setReviewData((prevData) => {
      return { ...prevData, text: text.slice(0, 400) };
    });
  }, []);

  const setHashtags = useCallback((text: string) => {
    setReviewData((prevData) => {
      return { ...prevData, hashtags: parseHashtags(text.slice(0, 400)) };
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
        <span style={{ marginLeft: '10px' }}>{reviewData.address}</span>
      </TitleDiv>
      <StarRateDiv>{RatingStars}</StarRateDiv>
      <TextAreaDiv>
        <p
          style={{
            position: 'absolute',
            right: '75px',
            top: '-35px',
            color: reviewData.text.length < 400 ? 'grey' : 'red',
            marginRight: '10px',
          }}
        >
          {reviewData.text.length} / 400
        </p>
        <TextInput
          placeholder="후기를 작성해주세요.(선택, 400자 이내)"
          rows={3}
          cols={20}
          onChange={(e) => {
            setText(e.target.value);
            setHashtags(e.target.value);
          }}
          value={reviewData.text}
        ></TextInput>
      </TextAreaDiv>
      <HashTagWrapper>
        {reviewData.hashtags?.map((h) => (
          <HashTag key={h}>{h}</HashTag>
        ))}
      </HashTagWrapper>
      <SubmitDiv>
        <SubmitBtn onClick={submitHandler}>제출하기</SubmitBtn>
      </SubmitDiv>
    </Modal>
  );
};

export default ReviewModal;
