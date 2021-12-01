import { IAPIResult } from '@myTypes/Common';
import { IMapInfo } from '@myTypes/Map';
import { showSnackbar, getOptions } from '@utils/common';

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
      getOptions('GET', undefined),
    )
      .then(async (response) => {
        const resJson = await response.json();
        if (response.status === 200) {
          return resJson;
        }
        throw new Error(resJson.message);
      })
      .catch((err) => {
        showSnackbar(err.message, true);
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
