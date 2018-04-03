import { createServer } from 'http';
import * as debug from 'debug';

import app from './server';

const server = createServer(app);
const port = normalizePort(process.env.PORT || 3000);
let currentApp = app;

server.listen(port, () => {
  debug(`Server listening on port ${port}`);
});

server.on('error', onError);
server.on('listening', onListening);

if (module.hot) {
  module.hot.accept(['./server'], () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}

function normalizePort(val: number | string): number | string | boolean {
  let p: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(p)) {
    return val;
  } else if (p >= 0) {
    return p;
  } else {
    return false;
  }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
