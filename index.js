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
                console.log(inform);
                reply.view('index', {
                    p: inform
                });
            });
        }
    });
    server.route({
        method: 'POST',
        path: '/subscribe',
        handler: (request, reply) => {

            if (!request.payload.email) {
                return reply({
                    result: 'failure',
                    message: 'Email address is required.'
                }).code(400);
            }
        }
    });


});



if (!module.parent) {
    server.start(function() {
        console.log("server running at localhost:8080");
    });
}

module.exports = server;
