type CoordType = [number, number];

interface SimpleMap {
  name: string;
  codeLength: number;
  center: CoordType;
}

const spreadDropdown = async (keyword, isSpread, setResults) => {
  const searchRegions = async (): Promise<SimpleMap[] | []> => {
    return await fetch(
      `http://${process.env.REACT_APP_SERVER_HOST}/api/map/search?keyword=${keyword}`,
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

export { spreadDropdown };
export type { SimpleMap };
