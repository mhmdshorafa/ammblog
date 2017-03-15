const Hapi = require('hapi');
var moment = require('moment');
const server = new Hapi.Server();
const getarticles = require('./app/dbutils/selectarticles.js');
const insertarticle = require('./app/dbutils/insertarticle.js');
const deletearticle = require('./app/dbutils/deletearticle.js');
const updatearticle = require('./app/dbutils/updatearticle.js');
console.log(insertarticle);
const conncrea = require('./app/dbutils/client.js');

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
            var arr = [];
            var now = moment()
            var date = now.format('YYYY-MM-DD');
            var time = now.format('HH:mm');
            arr.push(request.payload.arttitle);
            arr.push(request.payload.artimg);
            arr.push(time);
            arr.push(request.payload.content);
            arr.push(0);
            arr.push(date);
            insertarticle(arr, (err, inform) => {
                reply().redirect('/admin');
            })
        }
    });

    server.route({
        method: 'GET',
        path: '/deletearticle/{id}',
        handler: function(request, reply) {
            var id = encodeURIComponent(request.params.id);
            console.log('id', id);
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
            console.log(id);
            getarticles(id, (err, inform) => {
                console.log(inform[0]);
                reply.view('editarticle', inform[0]);
            });

        }
    });

    server.route({
        method: 'POST',
        path: '/updatearticle/{id}',
        handler: function(request, reply) {
            var arr = [];
            var id = encodeURIComponent(request.params.id);
            arr.push(request.payload.arttitle);
            arr.push(request.payload.artimg);
            arr.push(request.payload.content);
            arr.push(id);
            updatearticle(arr, (err, inform) => {
                reply().redirect('/admin');
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
