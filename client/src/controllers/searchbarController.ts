import { IAPIResult } from '@myTypes/Common';
import { IMapInfo } from '@myTypes/Map';

const spreadDropdown = async (
  keyword: string,
  isSpread: boolean,
  setResults: React.Dispatch<React.SetStateAction<IMapInfo[]>>,
  onlyDong = false,
): Promise<void> => {
  const searchRegions = async (): Promise<IAPIResult<IMapInfo[] | []>> => {
    const onlyDongQuery = onlyDong ? '&onlyDong=true' : '';
    return await fetch(
      `${process.env.REACT_APP_API_URL}/api/map/search?keyword=${keyword}${onlyDongQuery}`,
    )
      .then(async (response) => {
        if (response.status === 200) {
          return await response.json();
        }
        throw new Error('검색 결과를 받아오는데 실패했습니다!');
      })
      .catch((err) => {
        console.error(err);
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
