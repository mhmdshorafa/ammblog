const Hapi = require('hapi');
const server = new Hapi.Server();

const get = require('./app/getdata/center.js');
const articles = require('./app/dbutils/selectarticles.js');
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
            articles((err, inform) => {
                reply.view('index', {
                    p: inform
                });
            });
        }
    });
<<<<<<< HEAD
    server.route({
        method: 'GET',
        path: '/admin',
        handler: function(request, reply) {
            articles((err, inform) => {
                reply.view('admin', {
                    p: inform
                });
            });
        }
    });
=======

>>>>>>> 040c8a7cb67b73123d4fdea992b8738908448989

});



if (!module.parent) {
    server.start(function() {
        console.log("server running at localhost:8080");
    });
}

