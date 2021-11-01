const expressConfig = require('./config/expressConfig');

const apiRouter = require('./api');

function startServer() {
  const port = expressConfig.PORT;
  const server = app.createServer(app);

  server.listen(port, onListening);

  function onListening() {
    console.log('Listening on ' + port);
  }

  return server;
}

app.use('/api', apiRouter);

const server = startServer();