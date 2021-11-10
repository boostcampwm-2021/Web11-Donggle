import { expressLoader, logger, dbLoader } from '@loaders/index';
import config from '@config/index';

import express from 'express';
import _http from 'http';

const startServer = async () => {
  const app = express();
  const http = _http.createServer(app);
  expressLoader({ app });

  try {
    await dbLoader();
  } catch (e) {
    logger.error(e);
  }

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
};

void startServer();
