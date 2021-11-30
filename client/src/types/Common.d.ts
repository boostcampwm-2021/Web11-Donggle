interface IAPIResult<T> {
  result: T;
  message: string;
}

interface ILocationBase {
  pathname: string;
  state: { pathname: string, [index: string]: string };
  search: string;
  hash: string;
  key: string;
}

interface ISnackbar {
  message: string;
  error?: boolean;
  expire: number;
}

export { IAPIResult, ILocationBase, ISnackbar };
