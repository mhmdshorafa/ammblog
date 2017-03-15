const Hapi = require('hapi');
const server = new Hapi.Server();
const getarticles = require('./app/dbutils/selectarticles.js');
const insertarticle = require('./app/dbutils/insertarticle.js');
console.log(insertarticle);
const conncrea = require('./app/dbutils/client.js');

server.connection({
    port: process.env.PORT || 8080

});



server.register(require('vision', 'inert'), (err) => {

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'template',
        helpersPath: 'helpers'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            getarticles((err, inform) => {
                reply.view('index', {
                    p: inform
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/admin',
        handler: function(request, reply) {
            getarticles((err, inform) => {
                reply.view('admin', {
                    p: inform
                });
            });
        }
    });
    server.route({
        method: 'GET',
        path: '/addarticle',
        handler: function(request, reply) {
        reply.view('addarticle');
        }
    });

    server.route({
        method: 'POST',
        path: '/insertarticle',
        handler: function(request, reply) {
          var arr = [];
          arr.push(request.payload.arttitle);
          arr.push(request.payload.artimg);
          arr.push('1:50');
          arr.push(request.payload.content);
          arr.push(0);
          arr.push('1997-12-04');
          console.log(arr);
          insertarticle(arr,(err, inform) => {
            console.log(inform);
            reply.view('addarticle', {
                p: inform
            });
          });

        }
    });

});



if (!module.parent) {
    server.start(function() {
        console.log("server running at localhost:8080");
    });
}
