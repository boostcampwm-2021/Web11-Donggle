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

/*
  홍종우
  2021-11-30

Custom Error의 목적
  - Client 상 보여줄 Error 와 Logging을 할 Error를 구분하겠다.
  - Client 메시지는 Error Message에 정의된 대로 단순히 전달하거나 Custom하게 전달할 수 있어야함
  - Server 메시지는 원래 Error Message와 Stack trace가 필요함(Debugging이 가능)

에러는 2가지 방식 : try문에서 특정 분기 시, 직접 throw 하는 중에 DB 등 이슈로 인해 내부적으로 발생하는 Error
  - 직접 throw : status를 지정, message 지정
  - 내부 throw : 500으로 고정,
*/
const createCustomError = (
  status: keyof typeof ErrorStatus,
  error: Error & { status?: number; clientMsg?: string },
  message?: string,
) => {
  error.status = ErrorStatus[status];
  error.clientMsg = message || ErrorMessage[status];
  return error;
};

export default createCustomError;
