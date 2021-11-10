type CoordType = [number, number];

interface SimpleMap {
  name: string;
  codeLength: number;
  center: CoordType;
}

const spreadDropdown = async (keyword, isSpread, setResults) => {
  const searchRegions = async (): Promise<SimpleMap[] | []> => {
    return await fetch(
      `${process.env.REACT_APP_API_URL}/api/map/search?keyword=${keyword}`,
    )
      .then(async (response) => await response.json())
      .catch((err) => {
        console.error(err);
      });
  };

  const setDropdown = (_results, _isSpread) => {
    setResults(_results);
    isSpread = _isSpread;
  };

  const result: SimpleMap[] | [] = await searchRegions();
  if (result.length > 0) {
    setDropdown(result, true);
  } else {
    setDropdown([], false);
  }
};

const moveTo = (
  map: kakao.maps.Map | null,
  to: SimpleMap,
  setResults,
  inputTagRef,
) => {
  if (map === null) {
    return;
  }
  const [x, y] = to.center;
  const newCenter = new kakao.maps.LatLng(x, y);
  map.setCenter(newCenter);
  let newLevel = 9;
  switch (to.codeLength) {
    case 2:
      newLevel = 11;
      break;
    case 5:
      newLevel = 8;
      break;
    case 7:
      newLevel = 6;
      break;
    default:
      break;
  }
  map.setLevel(newLevel);
  inputTagRef.value = '';
  setResults([]);
};

export { spreadDropdown, moveTo };
export type { SimpleMap };
