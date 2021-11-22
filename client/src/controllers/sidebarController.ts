import { IAPIResult } from '@myTypes/Common';
import { IReviewContent, IReviewSubmit } from '@myTypes/Review';
import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css';
import '@components/ReviewModal/alertStyle.css';

const submitReview = (
  data: IReviewSubmit,
  routeHistory: (path: string, state: { [index: string]: string }) => void,
) => {
  confirmAlert({
    message: '후기를 제출하시겠습니까?',
    buttons: [
      {
        label: '제출',
        onClick: () => {
          const requestHeaders: HeadersInit = new Headers();
          requestHeaders.set('Content-Type', 'application/json');
          requestHeaders.set('token', sessionStorage.getItem('jwt') as string);

          fetch(`${process.env.REACT_APP_API_URL}/api/review`, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(data),
          }).then((res) => res.json());
          routeHistory('/', {});
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
  user: string | undefined = undefined,
  pageNum = 0,
  itemNum = 3,
): Promise<IAPIResult<IReviewContent[] | []>> => {
  let fetchUrl: string;

  switch (menu) {
    case 'myreview':
      fetchUrl = `${process.env.REACT_APP_API_URL}/api/${menu}?user=${user}&pageNum=${pageNum}&itemNum=${itemNum}`;
      break;
    default:
      fetchUrl = `${process.env.REACT_APP_API_URL}/api/${menu}?address=${address}&pageNum=${pageNum}&itemNum=${itemNum}`;
      break;
  }

  return await fetch(`${fetchUrl}`, {
    method: 'GET',
  })
    .then(async (response) => {
      if (response.status === 200) {
        return await response.json();
      }
      throw new Error(`Contents 정보를 받아오는데 실패했습니다!`);
    })
    .catch((err) => {
      console.error(err);
      return { result: null, message: err };
    });
};

const parseHashtags = (text: string) =>
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
