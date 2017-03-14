var test = require('tape');
var server = require('../index.js');

const requestDefaults = {
    method: 'GET',
    url: '/',

};

test('endpoint test | GET/ | Right Request', t => {
    const request = Object.assign({}, requestDefaults);//this method is to re-write the same request with different parameters or payload instead of re-writting the same request a couple of times 
    return server.inject(request)
        .then(response => {
            t.is(response.statusCode, 200, 'status code is 200');

            server.stop(t.end);
        });
});

test.onFinish(() => process.exit(0));
