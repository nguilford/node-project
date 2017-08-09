import _ from 'lodash';
import FS from 'fs';
import Path from 'path';

import Config from '../../../src/config';

// Manually load environment specific configuration
const envConfig = Path.join(__dirname, `../../../src/config/env/${Config.get('env')}.json`);

if (FS.existsSync(envConfig)) {
  Config.loadFile(envConfig);
}

// Override settings as desired
// Config.set('setting', 'value')

Config.validate();

// Let's clone this so stubs on Config  don't mess with the fixture
const config = _.cloneDeep(Config);

export default config;
