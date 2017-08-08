export default function endpoints(config) {
  return [
    {
      method: 'GET',
      path: '/status',
      handler: (request, reply) => (
        reply({
          status: 'healthy',
          version: config.get('version'),
        })
      ),
    },
  ];
}
