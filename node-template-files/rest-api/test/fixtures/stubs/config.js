import _ from 'lodash';
import Path from 'path';

import Config from '../../../src/config';

// Manually load environment specific configuration
Config.loadFile(Path.join(__dirname, `../../../src/config/env/${Config.get('env')}.json`))

// Override settings as desired
// Config.set('setting', 'value')

Config.validate();

// Let's clone this so stubs on Config  don't mess with the fixture
const config = _.cloneDeep(Config);

export default config;
