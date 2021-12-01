import { IMap, IRange } from '@myTypes/Map';
import { fetcher, showSnackbar } from '@utils/common';
import useSWRImmutable from 'swr/immutable';

export type UsePathsType = {
  paths: IMap[] | undefined;
  isLoading: boolean;
  isError: Error | undefined;
};

const usePaths = (range: IRange): UsePathsType => {
  const path = `${process.env.REACT_APP_API_URL}/api/map/polygon`;
  const query = `?address=${range.address}&scope=${range.scope}`;

  const key = path + query;
  const { data, error } = useSWRImmutable<IMap[], Error>(key, fetcher);
  if (error) {
    const message = error.message || '폴리곤 정보를 불러오는 데 실패했습니다.';
    showSnackbar(message, true);
  }

  return {
    paths: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePaths;
