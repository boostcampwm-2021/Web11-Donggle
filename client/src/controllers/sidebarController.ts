import { IAPIResult } from '@myTypes/Common';
import { IReviewContent } from '@myTypes/Review';

const fetchRegionData = async (
  address,
  menu,
): Promise<IAPIResult<IReviewContent[] | []>> => {
  return await fetch(
    `${process.env.REACT_APP_API_URL}/api/${
      menu === 'review' ? 'review' : 'article'
    }?address=${address}`,
    {
      method: 'GET',
    },
  )
    .then(async (response) => {
      if (response.status === 200) {
        return await response.json();
      }
      throw new Error('후기 정보를 받아오는데 실패했습니다!');
    })
    .catch((err) => {
      console.error(err);
    });
};

export { fetchRegionData };
