import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface ReviewDataType {
  address: string;
  content: string;
}

const submitReview = (data: ReviewDataType) => {
  confirmAlert({
    message: '후기를 제출하시겠습니까?',
    buttons: [
      {
        label: '제출',
        className: 'overlay-confirmation-submit',
        onClick: () => {
          console.log(data);
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
