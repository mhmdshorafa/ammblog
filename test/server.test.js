var test = require('tape');
var server = require('../index.js');
const requestDefaults = {
    method: 'GET',
    url: '/',

};

test('endpoint test | GET/ | Right Request', t => {
    const request = Object.assign({}, requestDefaults);
    //this method is to re-write the same request with different parameters or payload instead of re-writting the same request a couple of times
    return server.inject(request)
        .then(response => {
            t.is(response.statusCode, 200, 'status code is 200');

            server.stop(t.end);
        });
});
test('endpoint test | GET/main | Bad Request', t => {
    const request = Object.assign({}, requestDefaults, {
        url: '/main'
    });
    return server.inject(request)
        .then(response => {
            t.is(response.statusCode, 404, 'status code is 400');

            server.stop(t.end);
        });
});

test('endpoint test | GET/ | return html page of articles', t => {
    const request = Object.assign({}, requestDefaults, {
        url: '/'
    });
    return server.inject(request)
        .then(reply => {
            var found = reply.payload.indexOf('title');
            t.notEqual(found, -1, "The url GET/blog return list of articles");
            server.stop(t.end);
        });
});

test('endpoint test | GET/addarticle | return html page to add Article', t => {
    const request = Object.assign({}, requestDefaults, {
        url: '/addarticle'
    });
    return server.inject(request)
        .then(reply => {
            var found = reply.payload.indexOf('Add Article');
            t.notEqual(found, -1, "The url GET/blog return add article page");
            server.stop(t.end);
        });
});

test('endpoint test | GET/insertarticle | return html page to add Article', t => {
    const request = Object.assign({}, requestDefaults, {
        method: 'POST',
        url: '/insertarticle',
        payload: {
            arttitle: 'Test Article 4',
            artimg: 'bird.jpg',
            content: 'Test Article works',
            category: 'Node JS Test'
        }
    });
    return server.inject(request)
        .then(reply => {
            t.equal(reply.headers.location, '/admin', "The url POST/ return user to list of articles");
            server.stop(t.end);
        });
});

test('endpoint test | GET/editarticle | return html page to edit Article', t => {
    const request = Object.assign({}, requestDefaults, {
        url: '/editarticle/19'
    });
    return server.inject(request)
        .then(reply => {

            var found_edit = reply.payload.indexOf('Edit Article');
            t.notEqual(found_edit, -1, "The url GET/editarticle/20 redirect user to edit articles");
            server.stop(t.end);
        });
});

test('endpoint test | GET/insertarticle | return html page to add Article', t => {
    const request = Object.assign({}, requestDefaults, {
        method: 'POST',
        url: '/insertarticle',
        payload: {
            arttitle: 'Test Article 4',
            artimg: 'bird.jpg',
            content: 'Test Article works',
            category: 'Node JS Test'
        }
    });
    return server.inject(request)
        .then(reply => {
            t.equal(reply.headers.location, '/admin', "The url POST/ return user to list of articles");
            server.stop(t.end);
        });
});

test('endpoint test | GET/editarticle | return html page to edit Article', t => {
    const request = Object.assign({}, requestDefaults, {
        url: '/editarticle/20'
    });
    return server.inject(request)
        .then(reply => {

            var found_edit = reply.payload.indexOf('Edit Article');

            t.notEqual(found_edit, -1, "The url GET/editarticle/20 redirect user to edit articles");
            server.stop(t.end);
        });
});
test('endpoint test | GET/readmore | return html page to add Article', t => {
    const request = Object.assign({}, requestDefaults, {
        url: '/readmore/20',
          });
          return server.inject(request)
              .then(reply => {
                  var found = reply.payload.indexOf('Test Update Article');
                  t.notEqual(found, -1, "The url GET/editarticle/20 redirect user to edit articles");
                  server.stop(t.end);
              });
      });
