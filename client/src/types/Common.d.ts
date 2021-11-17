interface IAPIResult<T> {
  result: T;
  message: string;
}

interface ISnackbar {
  message: string;
  error?: boolean;
  expire: number;
}

export { IAPIResult, ISnackbar };
