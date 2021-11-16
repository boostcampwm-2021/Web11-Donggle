import { IReviewSubmit } from '@myTypes/Review';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const submitReview = (
  data: IReviewSubmit,
  routeHistory: (path: string, state: { [index: string]: string }) => void,
) => {
  confirmAlert({
    message: '후기를 제출하시겠습니까?',
    buttons: [
      {
        label: '제출',
        className: 'overlay-confirmation-submit',
        onClick: async () => {
          fetch(`${process.env.REACT_APP_API_URL}/api/review`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
            });
          routeHistory('/', {});
        },
      },
      {
        label: '취소',
        className: 'overlay-confirmation-cancel',
        onClick: () => {
          return;
        },
      },
    ],
    closeOnEscape: false,
    closeOnClickOutside: false,
    overlayClassName: 'overlay-confirmation-alert',
  });
};

export { submitReview };
