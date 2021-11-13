import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default () => {
  const history = useHistory();
  const location = useLocation();

  const routeHistory = useCallback(
    (path: string, state: { [index: string]: string }) => {
      console.log('전', location);
      history.push({
        pathname: path,
        state: state,
      });
      console.log('후', location);
    },
    [history],
  );

  return [history, routeHistory];
};
