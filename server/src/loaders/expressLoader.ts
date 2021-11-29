import config from 'configs/index';
import { logger } from '@loaders/index';
import apiController from 'apis/indexController';
import adminController from 'apis/adminController';

import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from '@utils/swagger.json';
import { makeApiResponse } from '@utils/index';

const stream = {
  write: (message) => {
    logger.info(message);
  },
};

const morganFormat = config.node_env !== 'production' ? 'dev' : 'combined';

export default ({ app }: { app: Application }) => {
  if (morganFormat == 'dev') {
    const allowedOrigins = [`${config.react_url}`];
    const options: cors.CorsOptions = {
      origin: allowedOrigins,
      credentials: true,
    };
    app.use(cors(options));
  }

  app.use(morgan(morganFormat, { stream }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/api', apiController);
  app.use('/admin', adminController);

  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerJson));

  // 404 에러 처리
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('404 NOT FOUND... Sorry..');
  });

  // error 처리
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack);
    res.status(500).json(makeApiResponse({}, err.message));
  });
};
