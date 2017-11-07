import _ from 'lodash';
import Path from 'path';
import FS from 'fs';
import { spawnSync } from 'child_process';

import Config from '../../src/config';
import * as Init from '../../src/config/initializers';
import * as Fixtures from '../fixtures';

// Global stubs
Sinon.stub(Config, 'initialize');
Sinon.stub(Config, 'get').callsFake(Fixtures.stubs.config.get);

// Explicitly run intializers with stubbed config
const skip = [ /* initalizers to skip */ ];
_.forEach(Init, (initializer, name) => {
  if (skip.indexOf(name) === -1) {
    initializer(Config);
  }
});
