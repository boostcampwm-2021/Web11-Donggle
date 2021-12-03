import mongoose, { ClientSession } from 'mongoose';
import { MapInfo, MapInfoModel } from '@models/MapInfo';
import { Review, ReviewModel } from '@models/Review';
import { UserModel } from '@models/User';
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
): Promise<ReviewFindData[] | []> => {
  // const sixMonth = new Date();
  // sixMonth.setMonth(sixMonth.getMonth() - 6);

  const fields = { categories: 1, text: 1, oauth_email: 1, createdAt: 1 };

  const reviewData = await ReviewModel.find(
    {
      address: { $regex: RegExp(address, 'g') },
      // createdAt: { $gte: sixMonth },
    },
    fields,
    {
      skip: pageNum * itemNum,
      limit: itemNum,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  const retData: ReviewFindData[] = [];
  for (const data of reviewData) {
    const userImage = await UserModel.findOne(
      { oauth_email: data.oauth_email },
      { image: 1 },
    ).lean();

    retData.push({
      image: userImage?.image || (process.env.IMAGE_DEFAULT_USER as string),
      ...data,
    });
  }

  return retData;
};

const queryUserReviews = async (
  user_email: string,
  pageNum: number,
  itemNum: number,
  address: string | undefined = undefined,
  period = 6,
): Promise<ReviewFindData[] | []> => {
  // const sixMonth = new Date();
  // sixMonth.setMonth(sixMonth.getMonth() - period);

  const fields = {
    address: 1,
    categories: 1,
    text: 1,
    oauth_email: 1,
    createdAt: 1,
  };

  const pipeline = {
    oauth_email: { $eq: user_email },
    // createdAt: { $gte: sixMonth },
  };
  address !== undefined &&
    Object.assign(pipeline, { address: { $regex: RegExp(address, 'g') } });

  const reviewData = await ReviewModel.find(pipeline, fields, {
    skip: pageNum * itemNum,
    limit: itemNum,
  })
    .sort({ createdAt: -1 })
    .lean();

  const retData: ReviewFindData[] = [];
  for (const data of reviewData) {
    const userImage = await UserModel.findOne(
      { oauth_email: data.oauth_email },
      { image: 1 },
    ).lean();

    retData.push({
      image: userImage?.image || (process.env.IMAGE_DEFAULT_USER as string),
      ...data,
    });
  }

  return retData;
};

const insertReview = async (data: ReviewInsertData) => {
  const session: ClientSession = await mongoose.startSession();

  await session.withTransaction(async () => {
    const mapInfo: MapInfo[] = await mapService.queryCenter(
      data.address,
      false,
      session,
    );
    const mapData = {
      code: mapInfo[0].code,
      center: mapInfo[0].center,
    };
    const insertData = {
      ...data,
      ...mapData,
    };
    await ReviewModel.create([insertData], { session: session });
    await mapService.updateRates(mapData.code, data, session);

    await updateMapInfoHashtag(
      data.address,
      data.hashtags as string[],
      session,
    );
  });

  await session.endSession();
};

const getCodeByAddress = async (address: string) => {
  const foundDocument = await MapInfoModel.findOne({ address });
  return foundDocument?.code;
};

const updateMapInfoHashtag = async (
  address: string,
  hashtags: string[],
  session: ClientSession | undefined,
) => {
  const code = await getCodeByAddress(address);
  if (!code) {
    throw new Error('해시태그를 업데이트하는데 address가 이상합니다!');
  } else {
    const conditions = [
      { codeLength: 2, code: code.slice(0, 2) },
      { codeLength: 5, code: code.slice(0, 5) },
      { codeLength: 7, code: code },
    ];
    const promises = conditions.map((condition) =>
      findAndModifyHashtag(condition, hashtags, session),
    );

    await Promise.all(promises);
  }
};

const findAndModifyHashtag = async (
  condition: { codeLength: number; code: string },
  hashtags: string[],
  session: ClientSession | undefined,
) => {
  const foundDocument = await MapInfoModel.findOne(condition);
  if (!foundDocument) {
    throw new Error('해시태그를 업데이트하는데 condition이 이상합니다!');
  } else {
    const prevHashtags = foundDocument.hashtags ?? new Map<string, number>();
    hashtags
      .filter((hashtag) => hashtag.length)
      .forEach((hashtag) => {
        const prevCount = prevHashtags.get(hashtag) ?? 0;
        prevHashtags.set(hashtag, prevCount + 1);
      });

    await MapInfoModel.updateOne(
      condition,
      { hashtags: prevHashtags },
      { session: session },
    );
    logger.info('해시태그를 정상적으로 업데이트 했습니다.');
  }
};

export default {
  dropModel,
  initializeReviewModel,
  queryReviews,
  queryUserReviews,
  insertReview,
  updateMapInfoHashtag,
};
