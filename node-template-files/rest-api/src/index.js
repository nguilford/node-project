import Sequelize from 'sequelize';

import Config from './config';
import Server from './server';
import Models from './models';

Config.initialize();

/* Add this to configure models when you have a db to connect to

Models.initialize(Sequelize.defaultConnection, Config);

*/

const server = new Server(Config);

server.start();
