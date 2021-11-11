const mouseOverStarHandler = (e) => {
  const data = e.target.dataset.value;
};

interface ReviewDataType {
  address: string;
  content: string;
}

const submitReview = (data: ReviewDataType) => {
  console.log(data.address, data.content);
};

export { mouseOverStarHandler, submitReview };
