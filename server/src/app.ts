import express from 'express';
import _http from 'http';

import { expressLoader, logger, dbLoader } from '@loaders/index';
import config from '@config/index';

const startServer = async () => {
  const app = express();
  const http = _http.createServer(app);
  expressLoader({ app });

  http
    .listen(config.port, () => {
      logger.info(`
    ################################################
    🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
    `);
    })
    .on('error', (err) => {
      logger.error(err);
      process.exit(1);
    });

  try {
    const db = await dbLoader();
    app.set('db', db);
  } catch (e) {
    logger.error(e);
  }
};

void startServer();
