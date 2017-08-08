import Bunyan from 'bunyan';
import Hapi from 'hapi';

import Routes from './routes';

const SERVER = Symbol('SERVER');

function setupServer(config) {
  const server = new Hapi.Server();

  server.connection({
    host: config.get('server.host'),
    port: config.get('server.port'),
  });

  Routes.register(server, config);

  return server;
}


export default class Server {
  constructor(config) {
    this[SERVER] = setupServer(config);
  }

  get server() {
    return this[SERVER];
  }

  start() {
    this.server.start(() => {
      Bunyan.defaultLogger.info(`Server listening at ${this.server.info.uri}`);
    });
  }

  stop() {
    this.server.stop(() => {
      Bunyan.defaultLogger.info('Server stopped');
    });
  }
}
