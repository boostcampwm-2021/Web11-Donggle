interface SearchResult {
  status: kakao.maps.services.Status;
  result: any;
}

const spreadDropdown = async (ps, keyword, isSpread, setResults) => {
  const searchRegions = async (): Promise<SearchResult> => {
    return await new Promise((resolve, reject) => {
      ps.keywordSearch(keyword, (result, status) => {
        resolve({ status, result });
      });
    });
  };

  const setDropdown = (_results, _isSpread) => {
    setResults(_results);
    isSpread = _isSpread;
  };

  if (keyword.length === 0) {
    return setDropdown([], false);
  }
  const { status, result }: SearchResult = await searchRegions();
  if (status === kakao.maps.services.Status.OK) {
    setDropdown(
      result.map((r) => `${r.place_name}\n${r.address_name}`),
      true,
    );
  } else {
    setDropdown([], false);
  }
};

export { spreadDropdown };
