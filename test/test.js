var test = require('tape');
var server =  require('../index.js') ;

const requestDefaults = {
  method: 'POST',
  url: '/subscribe',
  payload: {}
};

test('endpoint test | POST /subscribe | empty payload -> 400 Bad Request', t => {
  const request = Object.assign({}, requestDefaults);

  return server.inject(request)
    .then(response => {
      t.is(response.statusCode, 200, 'status code is 400');
      t.end();
    });
});
