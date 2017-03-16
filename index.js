const Hapi = require('hapi');
const server = new Hapi.Server();

const getarticles = require('./app/dbutils/selectarticles.js');
const insertarticle = require('./app/dbutils/insertarticle.js');
const deletearticle = require('./app/dbutils/deletearticle.js');
const updatearticle = require('./app/dbutils/updatearticle.js');
const conncrea = require('./app/dbutils/client.js');
const search = require('./app/dbutils/search.js');

const arrvalues = require('./app/utils/arrvalues.js');
const editvalues = require('./app/utils/editvalues.js');


server.connection({
    port: process.env.PORT || 8080
});

server.register([require('vision'), require('inert')], (err) => {

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
            var id = -1;
            getarticles(id, (err, inform) => {
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
            var id = -1;
            getarticles(id, (err, inform) => {
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
            var arr = arrvalues(request);
            insertarticle(arr, (err, inform) => {
                reply().redirect('/admin');
            });

        }
    });

    server.route({
        method: 'GET',
        path: '/deletearticle/{id}',
        handler: function(request, reply) {
            var id = encodeURIComponent(request.params.id);
            deletearticle(id, (err, inform) => {
                reply().redirect('/admin');
            });
        }
    });
    server.route({
        method: 'GET',
        path: '/editarticle/{id}',
        handler: function(request, reply) {
            var id = encodeURIComponent(request.params.id);
            getarticles(id, (err, inform) => {
                reply.view('editarticle', inform[0]);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/updatearticle/{id}',
        handler: function(request, reply) {
            var arr = editvalues(request);
            updatearticle(arr, (err, inform) => {
                reply().redirect('/admin');
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/readmore/{id}',
        handler: function(request, reply) {
            var id = encodeURIComponent(request.params.id);
            getarticles(id, (err, inform) => {
                reply.view('readmore', inform[0]);
            });
        }
    });
    server.route({
        method: 'GET',
        path: '/search/{val}',
        handler: function(request, reply) {
            var val = encodeURIComponent(request.params.val);
            search(val, (err, inform) => {
                reply.view('index',{
                    p: inform
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/template/style/{file*}',
        handler: {
            directory: {
                path: 'template/style'

            }
        }
    });
    server.route({
        method: 'GET',
        path: '/template/images/{file*}',
        handler: {
            directory: {
                path: 'template/images'
            }
        }
    })
});

if (!module.parent) {
    server.start(function() {
        console.log("server running at localhost:8080");
    });
}
module.exports = server;
