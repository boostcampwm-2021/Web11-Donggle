type CoordType = [number, number];

interface Rate {
  count: number;
  total: number;
  safety: number;
  traffic: number;
  food: number;
  entertainment: number;
}

interface MapInfo {
  address: string;
  code: string;
  codeLength: number;
  center: CoordType;
  //현재는 리뷰 정보가 없으므로 require를 false로함
  rate?: Rate;
}

const spreadDropdown = async (keyword, isSpread, setResults) => {
  const searchRegions = async (): Promise<MapInfo[] | []> => {
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

  const result: MapInfo[] | [] = await searchRegions();
  if (result.length > 0) {
    setDropdown(result, true);
  } else {
    setDropdown([], false);
  }
};

const moveTo = (
  map: kakao.maps.Map | null,
  to: MapInfo,
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
export type { MapInfo };
