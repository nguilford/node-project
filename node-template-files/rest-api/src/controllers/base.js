export default class BaseController {
  constructor(config) {
    this.config = config;
  }

  // Returns a JSONified representation of a Sequelize db object instance
  format(instance) {
    return instance.toJSON();
  }
}
