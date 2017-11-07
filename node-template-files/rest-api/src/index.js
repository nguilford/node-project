import Sequelize from 'sequelize'; // eslint-disable-line
import Bunyan from 'bunyan';

import Config from './config';
import Server from './server';
import Models from './models'; // eslint-disable-line

Config.initialize();

/* Add this to configure models when you have a db to connect to

Models.initialize(Sequelize.defaultConnection, Config);

*/

const server = new Server(Config);

function exit(message) {
  Bunyan.defaultLogger.info(message);

  return server.stop()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      Bunyan.defaultLogger.error(`Error shutting down: ${error}`);
      process.exit(1);
    });
}

process.on('SIGINT', () => {
  return exit('INT signal received. Shutting down');
});

process.on('SIGTERM', () => {
  return exit('TERM signal received. Shutting down');
});

server.start();

