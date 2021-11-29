import logger from '@loaders/loggerLoader';

enum ErrorStatus {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
}

enum ErrorMessage {
  BadRequest = '잘못된 요청입니다!',
  Unauthorized = '권한이 없습니다!',
  NotFound = '요청을 찾지 못했습니다.',
  InternalServerError = '내부 서버 오류입니다!',
}

// custom
const createError = (
  status: keyof typeof ErrorStatus,
  stacktrace?: string,
  message?: string,
) => {
  const error: Error & { status?: number } = new Error(
    message ?? ErrorMessage[status],
  );
  error.stack = stacktrace ?? error.stack;
  error.status = ErrorStatus[status];
  return error;
};

export default createError;
