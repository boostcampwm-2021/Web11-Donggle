import { MapInfo, MapInfoModel } from '@models/MapInfo';
import { Review, ReviewModel } from '@models/Review';
import { ReviewFindData, ReviewInsertData } from '@myTypes/Review';
import { mapService } from '@services/index';
import logger from '@loaders/loggerLoader';

const dropModel = async () => {
  await ReviewModel.collection.drop();
};

const initializeReviewModel = async () => {
  await ReviewModel.collection.createIndex({ address: 'text' });
};

const queryReviews = async (
  address: string,
  pageNum: number,
  itemNum: number,
): Promise<Review[] | []> => {
  const sixMonth = new Date();
  sixMonth.setMonth(sixMonth.getMonth() - 6);

  const fields = { categories: 1, text: 1, user: 1, createdAt: 1 };

  const reviewData = await ReviewModel.find(
    {
      address: { $regex: RegExp(address, 'g') },
      createdAt: { $gte: sixMonth },
    },
    fields,
    {
      skip: pageNum * itemNum,
      limit: itemNum,
    },
  ).sort({ createdAt: -1 });

  return reviewData;
};

const insertReview = async (data: ReviewInsertData) => {
  const mapInfo: MapInfo[] = await mapService.queryCenter(data.address, false);
  const mapData = {
    code: mapInfo[0].code,
    center: mapInfo[0].center,
  };
  const insertData = {
    ...data,
    ...mapData,
  };
  await ReviewModel.create(insertData);
  await mapService.updateRates(mapData.code, data);
};

const parseHashtags = (text: string) =>
  Array.from(text.matchAll(/#[^#\s]*/g)).map((hashtag) => hashtag[0]);

const getCodeByAddress = async (address: string) => {
  const foundDocument = await MapInfoModel.findOne({ address });
  return foundDocument?.code;
};

const findAndModifyHashtag = async (
  condition: { codeLength: number; code: string },
  hashtags: string[],
) => {
  const foundDocument = await MapInfoModel.findOne(condition);
  if (!foundDocument) {
    throw new Error('해시태그를 업데이트하는데 condition이 이상합니다!');
  } else {
    const prevHashtags = foundDocument.hashtags ?? new Map<string, number>();
    hashtags.forEach((hashtag) => {
      const prevCount = prevHashtags.get(hashtag) ?? 0;
      prevHashtags.set(hashtag, prevCount + 1);
    });

    void MapInfoModel.updateOne(condition, { hashtags: prevHashtags }).then(
      () => logger.info('해시태그를 업데이트했어요!'),
    );
  }
};

const updateMapInfoHashtag = async (address: string, hashtags: string[]) => {
  const code = await getCodeByAddress(address);
  if (!code) {
    throw new Error('해시태그를 업데이트하는데 address가 이상합니다!');
  } else {
    const conditions = [
      { codeLength: 2, code: code.slice(0, 2) },
      { codeLength: 5, code: code.slice(0, 5) },
      { codeLength: 7, code: code },
    ];
    conditions.forEach((condition) => {
      void findAndModifyHashtag(condition, hashtags);
    });
  }
};

export default {
  dropModel,
  initializeReviewModel,
  queryReviews,
  insertReview,
  parseHashtags,
  updateMapInfoHashtag,
};
