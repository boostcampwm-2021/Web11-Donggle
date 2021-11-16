import { MapInfo } from '@models/MapInfo';
import { ReviewModel } from '@models/Review';
import { ReviewInsertData } from '@myTypes/Review';
import { mapService } from '@services/index';

const dropModel = async () => {
  await ReviewModel.collection.drop();
};

const initializeReviewModel = async () => {
  await ReviewModel.collection.createIndex({ address: 'text' });
};

const insertReview = async (data: ReviewInsertData) => {
  const mapInfo: MapInfo[] = await mapService.queryCenter(data.address);
  const codeAndCenter = {
    code: mapInfo[0].code,
    center: mapInfo[0].center,
  };
  const insertData = {
    ...data,
    ...codeAndCenter,
  };
  await ReviewModel.create(insertData);
};

export default { dropModel, initializeReviewModel, insertReview };
