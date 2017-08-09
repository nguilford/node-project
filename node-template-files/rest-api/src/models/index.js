import FS from 'fs';
import Path from 'path';

const Models = {
  // Must be called before models are accessible
  initialize: function initialize(connection, config) {
    const models = {};
    const re = /[.]js$/;

    (function initModels(dir) {
      FS.readdirSync(dir).forEach((file) => {
        const filePath = Path.join(dir, file);
        let model;

        // Recurse directories
        if (FS.lstatSync(filePath).isDirectory()) {
          initModels(filePath);
        }

        // Initalize and attach all non-hidden, non-index .js files
        if (file.match(re) && file.indexOf('.') !== 0 && file !== 'index.js') {
          model = connection.import(filePath);
        }

        if ('initialize' in model) {
          model.initialize(config);
        }

        models[model.name] = model;
      });

      // Configure relations
      Object.keys(models).forEach((model) => {
        if ('associate' in models[model]) {
          models[model].associate(models);
        }
      });
    }(__dirname));

    Object.assign(Models, models);
  },
};

export default Models;
