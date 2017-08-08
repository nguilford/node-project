import Path from 'path';
import FS from 'fs';
import convict from 'convict';

import * as Initializers from './initializers';

const ENV_VAR_PREFIX = 'APP';

function envName(envVar) {
  return `${ENV_VAR_PREFIX}_${envVar}`;
}

const config = convict({
  version: {
    doc: 'Application version',
    format: String,
    default: require('../../package.json').version,
  },

  env: {
    doc: 'The application environment',
    format: [
      'dev',
      'prod',
    ],
    default: 'dev',
    env: envName('ENV'),
  },

  log: {
    name: {
      doc: 'Log name',
      format: String,
      default: 'application-logger',
      env: envName('LOG_NAME'),
    },

    level: {
      doc: 'Bunyan log level (name or number)',
      format: (val) => {
        if (typeof val !== 'string' && typeof val !== 'number') {
          throw new TypeError('Log level must be a string of a number');
        }
      },
      default: 'info',
      env: envName('LOG_LEVEL'),
    },
  },
});

// You must call initialize before config settings are available
config.initialize = () => {
  const env = config.get('env');
  const envConfig = Path.join(__dirname, 'env', `${env}.json`);

  // Load env specific configuration and validate
  if (FS.existsSync(envConfig)) {
    config.loadFile(envConfig);
  }

  config.validate();

  // Run any initializers
  _.forEach(Initializers, (initialize) => {
    initialize(config);
  });
};

export default config;
