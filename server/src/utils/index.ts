const makeApiResponse = <T>(result: T, message: string) => {
  return {
    result,
    message,
  };
};

export { makeApiResponse };
