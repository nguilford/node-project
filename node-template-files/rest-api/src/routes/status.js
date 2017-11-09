import StatusController from '../controllers/status';

export default function endpoints(config) {
  const controller = new StatusController(config);

  return [
    {
      method: 'GET',
      path: '/status',
      handler: controller.fetch.bind(controller),
    },
  ];
}
