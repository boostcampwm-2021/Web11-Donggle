import express from 'express';
import _http from 'http';

import loaders from '@loaders/index';
import config from '@config/index';

async function startServer() {
  const app = express();
	const http = _http.createServer(app);
	await loaders({ expressApp: app, http });

	http.listen(config.port, () => {
		//Logger.info(`
    console.log(`
    ################################################
    🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
    `);
	}).on('error', (err) => {
		// Logger.error(err);
    console.error(err);
		process.exit(1);
	});
}

startServer();