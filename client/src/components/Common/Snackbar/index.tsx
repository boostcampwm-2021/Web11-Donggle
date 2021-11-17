import { SnackbarWrapper } from '@components/Common/Snackbar/index.style';

import React from 'react';

const Snackbar: React.FC<{
  message: string;
  duration?: number;
  error?: boolean;
}> = ({ message = '', duration = 3, error = false }) => {
  return (
    <SnackbarWrapper duration={duration} error={error}>
      {message}
    </SnackbarWrapper>
  );
};

export default Snackbar;
