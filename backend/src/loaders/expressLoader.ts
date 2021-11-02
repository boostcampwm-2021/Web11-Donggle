import express, {Application, Request, Response, NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import api from '@api/index';

export default async ({ app }: { app: Application }) => {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/api', api);

  // 404 에러 처리
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("404 NOT FOUND... Sorry..");
  });

  // error 처리
  app.use((err, req: Request, res: Response, next: NextFunction) => {
    return next(err);
  });
}
