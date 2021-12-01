import { IAPIResult } from '@myTypes/Common';
import { IReviewContent, IReviewSubmit } from '@myTypes/Review';
import { confirmAlert } from 'react-confirm-alert';
import { getOptions, showSnackbar } from '@utils/common';

import 'react-confirm-alert/src/react-confirm-alert.css';
import '@modals/ReviewSubmitModal/alertStyle.css';

const submitReview = (
  data: IReviewSubmit,
  routeHistory: (path: string, state?: { [index: string]: string }) => void,
): void => {
  confirmAlert({
    message: '후기를 제출하시겠습니까?',
    buttons: [
      {
        label: '제출',
        onClick: () => {
          fetch(
            `${process.env.REACT_APP_API_URL}/api/review`,
            getOptions('POST', data, 'same-origin'),
          )
            .then(async (res) => {
              const resJson = await res.json();
              if (res.status === 201) showSnackbar(resJson.message);
              else throw new Error(resJson.message);
            })
            .catch((err) => showSnackbar(err.message, true));
          routeHistory('/map');
        },
      },
      {
        label: '취소',
        onClick: () => {
          return;
        },
      },
    ],
    closeOnEscape: false,
    closeOnClickOutside: false,
  });
};

const fetchContentData = async (
  address: string,
  menu: string,
  pageNum = 0,
  itemNum = 3,
): Promise<IAPIResult<IReviewContent[] | []>> => {
  let fetchUrl = `${process.env.REACT_APP_API_URL}/api/review`;

  switch (menu) {
    case 'myreview':
      fetchUrl += `/user?pageNum=${pageNum}&itemNum=${itemNum}`;
      break;
    default:
      fetchUrl += `?address=${address}&pageNum=${pageNum}&itemNum=${itemNum}`;
      break;
  }

  return await fetch(`${fetchUrl}`, getOptions('GET', undefined, 'same-origin'))
    .then(async (response) => {
      const resJson = await response.json();
      if (response.status === 200) return resJson;
      else throw new Error(resJson.message);
    })
    .catch((err) => {
      showSnackbar(err.message, true);
      return { result: null, message: err };
    });
};

const parseHashtags = (text: string): string[] =>
  Array.from(text.matchAll(/#[^#\s]*/g))
    .map((hashtag) => hashtag[0].replace('#', ''))
    .reduce((a, hashtag) => {
      if (!a.includes(hashtag)) {
        return [...a, hashtag];
      } else {
        return a;
      }
    }, <string[]>[]);

export { submitReview, fetchContentData, parseHashtags };
