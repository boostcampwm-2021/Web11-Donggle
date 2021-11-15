import config from '@config/index';
import path from 'path';
import { format, createLogger, transports } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = format;

const logDir: string = path.join(path.resolve(), '/logs'); // logs 디렉토리 하위에 로그 파일 저장

interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: string;
}

const logFormat = printf((info: TransformableInfo) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // info 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`, // file 이름 날짜로 저장
      maxFiles: 2, // 30일치 로그 파일 저장
      zippedArchive: true,
    }),
    // warn 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'warn',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/warn',
      filename: `%DATE%.warn.log`, // file 이름 날짜로 저장
      maxFiles: 2, // 30일치 로그 파일 저장
      zippedArchive: true,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // error.log 파일은 /logs/error 하위에 저장
      filename: `%DATE%.error.log`,
      maxFiles: 2,
      zippedArchive: true,
    }),
  ],
});

// Production 환경이 아닌 경우(dev 등) 배포 환경에서는 최대한 자원을 안잡아 먹는 로그를 출력해야함
if (config.node_env !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(
        colorize({ all: true }), // console 에 출력할 로그 컬러 설정 적용함
        logFormat, // log format 적용
      ),
    }),
  );
}

export default logger;
