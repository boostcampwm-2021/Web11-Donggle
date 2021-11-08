import { logger } from '@loaders/index';
import apiController from '@api/indexController';
import adminController from '@api/adminController';

import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

const stream = {
  write: (message) => {
    logger.info(message);
  },
};

const morganFormat = process.env.NODE_ENV !== 'production' ? 'dev' : 'combined';

export default ({ app }: { app: Application }) => {
  const allowedOrigins = [`${process.env.REACT_URL as string}`];
  const options: cors.CorsOptions = {
    origin: allowedOrigins,
  };

  app.use(morgan(morganFormat, { stream }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors(options));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/api', apiController);
  app.use('/admin', adminController);

  // 404 에러 처리
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('404 NOT FOUND... Sorry..');
  });

  // error 처리
  app.use((err, req: Request, res: Response, next: NextFunction) => {
    return next(err);
  });
};
