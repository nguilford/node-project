import FS from 'fs';
import Path from 'path';
import Bunyan from 'bunyan';

const RE = /route[.].+[.]js/;

const routes = {
  register: function register(server, config) {
    (function importRoutes(dir) {
      FS.readdirSync(dir).forEach((file) => {
        const filePath = Path.join(dir, file);

        // Recurse directories
        if (FS.lstatSync(filePath).isDirectory()) {
          importRoutes(filePath);
        }

        // Ignore non-route modules
        if (file.match(RE)) {
          // eslint-disable-next-line
          const route = require(filePath).default;

          // Register all endpoints in route
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
