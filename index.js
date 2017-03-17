const Hapi = require('hapi');
const server = new Hapi.Server();
var pg = require('pg');
var connect = require('./app/dbutils/connect.js')
var config = require('./app/dbutils/config.js')
const arrvalues = require('./app/utils/arrvalues.js');
const editvalues = require('./app/utils/editvalues.js');

var client = connect.createclient(config.heroku);


server.connection({
    port: process.env.PORT || 8080
});

server.register([require('vision'), require('inert')], (err) => {

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'template'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            var id = -1;
            connect.selectarticle(id, client,(err, inform) => {
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
            connect.selectarticle(id, client,(err, inform) => {
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
            connect.insertarticle(arr, client,(err, inform) => {

            });
            reply().redirect('/admin');

        }
    });

    server.route({
        method: 'GET',
        path: '/deletearticle/{id}',
        handler: function(request, reply) {
            var id = encodeURIComponent(request.params.id);
            connect.deletearticle(id, client,(err, result) => {
                reply().redirect('/admin');
            });
        }
    });
    server.route({
        method: 'GET',
        path: '/editarticle/{id}',
        handler: function(request, reply) {
            var id = encodeURIComponent(request.params.id);
            connect.selectarticle(id,client, (err, inform) => {
                reply.view('editarticle', inform[0]);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/updatearticle/{id}',
        handler: function(request, reply) {
          console.log('payload update ',request.payload);
            var arr = editvalues(request);
            connect.updatearticle(arr,client, (err, inform) => {
                reply().redirect('/admin');
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/readmore/{id}',
        handler: function(request, reply) {
            var id = encodeURIComponent(request.params.id);
            connect.selectarticle(id,client, (err, inform) => {
              console.log(inform[0]);
                reply.view('readmore', inform[0]);
            });
        }
    });
    server.route({
        method: 'GET',
        path: '/search/{val}',
        handler: function(request, reply) {
            var val = encodeURIComponent(request.params.val);
            connect.filterarticle(val,client, (err, inform) => {
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
                path: '/template/style'

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
