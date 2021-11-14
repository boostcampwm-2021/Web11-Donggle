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

export { spreadDropdown };
