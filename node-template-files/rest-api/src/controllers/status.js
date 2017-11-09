import BaseController from './base';

export default class StatusController extends BaseController {
  fetch(request, reply) {
    return reply({
      status: 'healthy',
      version: this.config.get('version'),
    });
  }
}
