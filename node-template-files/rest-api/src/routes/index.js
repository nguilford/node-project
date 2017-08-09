import FS from 'fs';
import Path from 'path';
import Bunyan from 'bunyan';


const routes = {
  register: function register(server, config) {
    const re = /[.]js$/;

    (function importRoutes(dir) {
      FS.readdirSync(dir).forEach((file) => {
        const filePath = Path.join(dir, file);

        // Recurse directories
        if (FS.lstatSync(filePath).isDirectory()) {
          importRoutes(filePath);
        }

        // Register all non-hidden, non-index .js files
        if (file.match(re) && file.indexOf('.') !== 0 && file !== 'index.js') {
          // eslint-disable-next-line
          const route = require(filePath).default;

          route(config).forEach((endpoint) => {
            server.route(endpoint);
            Bunyan.defaultLogger.info(`Registered endpoint: ${endpoint.method} ${endpoint.path}`);
          });
        }
      });
    }(__dirname));
  },
};

export default routes;
