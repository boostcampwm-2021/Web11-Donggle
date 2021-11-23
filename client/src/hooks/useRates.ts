import { IMapInfo, IRange } from '@myTypes/Map';
import { fetcher } from '@utils/common';
import useSWR from 'swr';

const useRates = (range: IRange) => {
  const path = `${process.env.REACT_APP_API_URL}/api/map/rates`;
  const query = `?address=${range.address}&scope=${range.scope}`;

  const key = path + query;
  const { data, error } = useSWR<IMapInfo[]>(key, fetcher);

  return {
    rates: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useRates;
