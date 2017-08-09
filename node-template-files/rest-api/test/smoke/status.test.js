import request from 'request-promise';

import Config from '../../src/config';

describe('Calling GET /status', () => {
  it('should return 200 with json-formatted status info', () => (
    request({
      uri: `http://${Config.get('server.host')}:${Config.get('server.port')}/status`,
      simple: false,
      resolveWithFullResponse: true,
    })
    .then((response) => {
      const expected = {
        status: 'healthy',
        version: Config.get('version')
      };

      expect(response.statusCode).to.be.equal(200);
      expect(JSON.parse(response.body)).to.be.eql(expected);
    })
  ));
});
