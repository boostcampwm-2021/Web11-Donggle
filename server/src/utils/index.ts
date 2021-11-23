const makeApiResponse = <T>(result: T, message: string) => {
  return {
    result,
    message,
  };
};

const isRangeValid = (
  address: string | undefined,
  scope: string | undefined,
) => {
  if (address === undefined) return false;
  if (scope === undefined) return false;
  if (scope !== 'big' && scope !== 'medium' && scope !== 'small') return false;
  return true;
};

export { makeApiResponse, isRangeValid };
