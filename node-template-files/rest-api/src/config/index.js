import _ from 'lodash';
import FS from 'fs';
import Path from 'path';
import convict from 'convict';

import * as Initializers from './initializers';

// Change this to your app name
const ENV_VAR_PREFIX = 'APP';

function setEnv(envVar) {
  return `${ENV_VAR_PREFIX}_${envVar}`;
}

const config = convict({
  env: {
    doc: 'The application environment',
    format: [
      'dev',
    ],
    default: 'dev',
    env: setEnv('ENV'),
  },

  version: {
    doc: 'Application version',
    format: String,
    default: require('../../package.json').version, // eslint-disable-line global-require
  },

  log: {
    name: {
      doc: 'Log name',
      format: String,
      default: 'application-logger',
      env: setEnv('LOG_NAME'),
    },

    level: {
      doc: 'Bunyan log level (name or number)',
      format: (val) => {
        if (typeof val !== 'string' && typeof val !== 'number') {
          throw new TypeError('Log level must be a string of a number');
        }
      },
      default: 'info',
      env: setEnv('LOG_LEVEL'),
    },
  },

  server: {
    host: {
      doc: 'Server hostname',
      format: String,
      default: 'localhost',
      env: setEnv('HOSTNAME'),
    },

    port: {
      doc: 'Port server is listening on',
      format: Number,
      default: 8080,
      env: setEnv('PORT'),
    },
  },

  database: {
    dialect: {
      doc: 'Sequelize database dialect',
      format: String,
      default: '',
      env: setEnv('DATABASE_DIALECT'),
    },

    storage: {
      doc: 'Sequelize storage type. Used only if dialect is sqlite',
      format: String,
      default: '',
      env: setEnv('DATABASE_STORAGE'),
    },

    host: {
      doc: 'Database host',
      format: String,
      default: 'localhost',
      env: setEnv('DATABASE_HOST'),
    },

    user: {
      doc: 'Database user',
      format: String,
      default: '',
      env: setEnv('DATABASE_USER'),
    },

    password: {
      doc: 'Database password',
      format: String,
      default: '',
      env: setEnv('DATABASE_PASSWORD'),
    },

    name: {
      doc: 'Database name',
      format: String,
      default: '',
      env: setEnv('DATABASE_NAME'),
    },

    connection: {
      doc: 'Default database connection object',
      format: Object,
      default: {},
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
