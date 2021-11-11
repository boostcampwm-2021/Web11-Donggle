interface ReviewDataType {
  address: string;
  content: string;
}

const submitReview = (data: ReviewDataType) => {
  console.log(data);
};

export { submitReview };
