/* ***********************************
/* root-level hooks for all files.
/* No tests defined here; just global
/* before(Each) and after(Each).
/* **********************************/

import Config from '../../src/config';
import Server from '../../src/server';

const server = new Server(Config);

before(() => {
  return server.start();
});

after(() => {
  return server.stop();
});
