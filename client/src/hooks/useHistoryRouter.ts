import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export type UseRouteHistoryType = (
  path: string,
  state?: { [index: string]: string | boolean },
) => void;

export default (): UseRouteHistoryType => {
  const history = useHistory();

  const routeHistory: UseRouteHistoryType = useCallback(
    (path: string, state: { [index: string]: string | boolean } = {}) => {
      history.push({
        pathname: path,
        state: state,
      });
    },
    [history],
  );

  return routeHistory;
};
