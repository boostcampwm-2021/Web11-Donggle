import { MapInfoModel } from '@models/MapInfo';
import logger from '@loaders/loggerLoader';
import { authService, reviewService } from '@services/index';
import { UserModel } from '@models/User';

const random = (from: number, to: number) => {
  return Number((Math.random() * (to - from) + from).toFixed(2));
};

const getRandomRate = (maxNum: number) => {
  return Math.floor(random(1, maxNum));
};

const populateUsers = async () => {
  (await MapInfoModel.find({})).forEach((doc, idx) => {
    if (doc.codeLength < 7) return;

    const { address, code, center } = doc;
    const oauth_email = `donggle_user${idx}`;
    const userInfo = {
      oauth_email,
      address,
      code,
      center,
      image: '',
    };
    void authService.saveUserInfo(userInfo).then(() => {
      logger.info(`${oauth_email} -> users`);
    });
  });
};

const populateReviews = async () => {
  const randomReviewData = [
    '저희 동네는 조용하고 사람 살기 좋아요.',
    '놀 게 많긴 한데 시끄러워요.',
    '공원이 가까워서 좋고 도서관도 있어서 살기 좋아요',
    '요즘 뜨고 있는 핫플레이스가 군데 군데 있어요.',
    '사람 많은 만큼 편의시설은 좋습니다',
    '한적하고 조용한 동네에요.',
    '그저 그래요.',
    '역이 바로 앞에 있어서 좋아요',
    '학원가에요. 애들 교육시키고 싶으면 이 동네가 딱입니다',
    '반려동물 키우기 좋아요. 특히 산책하기 매우 좋아요',
    '외국인이 살기 좋아요. 주변에 외국인 친구들이 있어서 도움 받기 쉬워요',
    '고시촌이에요. 다들 조용...',
    '주변에 회사가 많아서 물가가 비싼 편입니다',
    '여행하기 좋은 동네에요.',
    '치안이 좋아요. 근처에 경찰서도 있고 범죄율도 낮아요',
  ];

  const randomHashTag = [
    '따뜻함',
    '산책',
    '치안좋음',
    '조용',
    '외국인',
    '역세권',
    '학교',
    '편의시설',
    '여행',
    '시끄러움',
    '학원',
    'PC방많음',
    '음식맛남',
    '데이트하기좋음',
    '치킨맛집많음',
    '물가가쌈',
  ];

  for await (const user of UserModel.find({})) {
    if (!user.oauth_email.startsWith('donggle')) return;

    for await (const num of Array.from([1, 2, 3, 4, 5])) {
      const safety = getRandomRate(5.1);
      const traffic = getRandomRate(5.1);
      const food = getRandomRate(5.1);
      const entertainment = getRandomRate(5.1);
      const categories = {
        safety,
        traffic,
        food,
        entertainment,
      };

      const createdAt = new Date();
      createdAt.setMonth(createdAt.getMonth() - num * 3);

      const reviewData = {
        address: user.address,
        text: randomReviewData[
          getRandomRate(randomReviewData.length + 0.1) - 1
        ],
        oauth_email: user.oauth_email,
        hashtags: [
          randomHashTag[getRandomRate(randomHashTag.length + 0.1) - 1],
        ],
        categories,
        createdAt,
      };
      try {
        await reviewService.insertReview(reviewData);
        logger.info(`Review by ${user.oauth_email} -> reviews`);
      } catch (err) {
        logger.error(err);
      }
    }
  }
};

export default { populateUsers, populateReviews };
