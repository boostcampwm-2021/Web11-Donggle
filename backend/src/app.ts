import express from 'express';
import _http from 'http';

import { expressLoader } from '@loaders/index';
import config from '@config/index';

function startServer() {
  const app = express();
  const http = _http.createServer(app);
  expressLoader({ app });

  http
    .listen(config.port, () => {
      console.log(`
    ################################################
    🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
    `);
    })
    .on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
