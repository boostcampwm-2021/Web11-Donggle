import { SnackbarDiv } from '@components/Snackbar/index.style';
import { ISnackbar } from '@myTypes/Common';

import React, { useState, useEffect } from 'react';

let [snackbars, setSnackbars]: [
  ISnackbar[] | [] | null,
  React.Dispatch<React.SetStateAction<ISnackbar[] | []>> | null,
] = [null, null];

const Snackbar: React.FC = () => {
  [snackbars, setSnackbars] = useState<ISnackbar[] | []>([]);

  useEffect(() => console.log(snackbars), [snackbars]);

  return (
    <>
      {snackbars.map((snackbar) => (
        <SnackbarDiv key={snackbar.expire} error={snackbar.error}>
          {`${snackbar.error ? '🚫' : '✅'} ${snackbar.message}`}
        </SnackbarDiv>
      ))}
    </>
  );
};

export default Snackbar;
export { snackbars, setSnackbars };
