import { IMap, IRange } from '@myTypes/Map';
import { fetcher } from '@utils/common';
import useSWRImmutable from 'swr/immutable';

export type UsePathsType = {
  paths: IMap[] | undefined;
  isLoading: boolean;
  isError: any;
};

const usePaths = (range: IRange): UsePathsType => {
  const path = `${process.env.REACT_APP_API_URL}/api/map/polygon`;
  const query = `?address=${range.address}&scope=${range.scope}`;

  const key = path + query;
  const { data, error } = useSWRImmutable<IMap[]>(key, fetcher);

  return {
    paths: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePaths;
