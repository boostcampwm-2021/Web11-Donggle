import { ReviewModel } from '@models/Review';

const dropModel = async () => {
  await ReviewModel.collection.drop();
};

const initializeReviewModel = async () => {
  await ReviewModel.collection.createIndex({ address: 'text' });
};

const insertReview = async (insertData) => {
  await ReviewModel.create(insertData);
};

export default { dropModel, initializeReviewModel, insertReview };
