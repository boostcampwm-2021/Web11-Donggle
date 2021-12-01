import { IMapInfo, IRange } from '@myTypes/Map';
import { fetcher, showSnackbar } from '@utils/common';
import useSWR from 'swr';

export type UseRatesType = {
  rates: IMapInfo[] | undefined;
  isLoading: boolean;
  isError: Error | undefined;
};

const useRates = (range: IRange): UseRatesType => {
  const path = `${process.env.REACT_APP_API_URL}/api/map/rates`;
  const query = `?address=${range.address}&scope=${range.scope}`;

  const key = path + query;
  const { data, error } = useSWR<IMapInfo[], Error>(key, fetcher);
  if (error) {
    const message = error.message || '평점 정보를 불러오는 데 실패했습니다.';
    showSnackbar(message, true);
  }

  return {
    rates: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useRates;
