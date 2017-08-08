import Config from './config';
import Server from './server';

Config.initialize();

const server = new Server(Config);

server.start();
