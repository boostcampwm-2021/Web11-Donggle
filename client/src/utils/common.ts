import { ICategories } from '@myTypes/Review';
import { IAPIResult } from '@myTypes/Common';
import { snackbars, setSnackbars } from '@components/Snackbar';

const calcTotal = (categories: ICategories) => {
  const total =
    Object.keys(categories)
      .filter((category) => category !== '_id')
      .map((category) => {
        return categories[category];
      })
      .reduce((total, current) => current + total, 0) / 4;
  return total;
};

const calcDateDiff = (targetDate: Date) => {
  const now = new Date();
  const target = new Date(targetDate);

  let diff = now.getUTCFullYear() - target.getUTCFullYear();
  if (diff >= 1) return `${diff}년 전`;

  diff = now.getUTCMonth() - target.getUTCMonth();
  if (diff >= 1) return `${diff}개월 전`;

  diff = now.getUTCDate() - target.getUTCDate();
  if (diff >= 1) return `${diff}일 전`;

  diff = now.getUTCHours() - target.getUTCHours();
  if (diff >= 1) return `${diff}시간 전`;

  diff = now.getUTCMinutes() - target.getUTCMinutes();
  if (diff >= 1) return `${diff}분 전`;

  return `방금 전`;
};

const showSnackbar = (message: string, error = false) => {
  const snackbar = { message, error, expire: Date.now() + 5000 };
  if (snackbars !== null && setSnackbars !== null) {
    setSnackbars((prev) => [...prev, snackbar]);
    setTimeout(() => {
      if (snackbars !== null && setSnackbars !== null) {
        setSnackbars((prev) => prev.filter((p) => p.expire > Date.now()));
      }
    }, 5000);
  } else {
    console.error('Snackbar Component의 상태가 이상합니다!');
  }
};

const getDebouncedFunction = (targetFunction: () => void, time: number) => {
  let timeoutId: NodeJS.Timeout;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => targetFunction(), time);
  };
};

const getPrevPath = (to: string) => {
  const paths = to.match(/\/[^\/]*/g);
  if (paths === null) {
    return '/map';
  }
  paths.pop();
  return paths.join();
};

const fetcher = async <T>(info: RequestInfo, init?: RequestInit) => {
  const response = await fetch(info, init);
  if (response.status !== 200) throw Error('요청 실패');
  const json: IAPIResult<T> = await response.json();
  return json.result;
};

export {
  calcTotal,
  calcDateDiff,
  getDebouncedFunction,
  showSnackbar,
  getPrevPath,
  fetcher,
};
