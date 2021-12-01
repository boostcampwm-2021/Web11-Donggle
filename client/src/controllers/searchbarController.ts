import { IAPIResult } from '@myTypes/Common';
import { IMapInfo } from '@myTypes/Map';
import { showSnackbar, getOptions } from '@utils/common';

const spreadDropdown = async (
  keyword,
  isSpread,
  setResults,
  onlyDong = false,
) => {
  const searchRegions = async (): Promise<IAPIResult<IMapInfo[] | []>> => {
    const onlyDongQuery = onlyDong ? '&onlyDong=true' : '';
    return await fetch(
      `${process.env.REACT_APP_API_URL}/api/map/search?keyword=${keyword}${onlyDongQuery}`,
      getOptions('GET', undefined),
    )
      .then(async (response) => {
        if (response.status === 200) {
          return await response.json();
        }
        throw new Error();
      })
      .catch((err) => {
        showSnackbar('검색결과를 받아오지 못했어요!', true);
        return { result: [] };
      });
  };

  const setDropdown = (_results, _isSpread) => {
    setResults(_results);
    isSpread = _isSpread;
  };

  const { result } = await searchRegions();

  if (result.length > 0) {
    setDropdown(result, true);
  } else {
    setDropdown([], false);
  }
};

export { spreadDropdown };
