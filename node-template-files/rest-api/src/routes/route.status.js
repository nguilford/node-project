export default function endpoints(config) {
  return [
    {
      method: 'GET',
      path: '/status',
      handler: function handler(request, reply) {
        return reply({
          status: 'healthy',
          version: config.get('version'),
        });
      },
    },
  ];
}
