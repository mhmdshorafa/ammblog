<<<<<<< HEAD
'use strict'

require('dotenv').config();
var http = require('http');
var mainHandler =require('./main.js');
var PORT = process.env.PORT || 8080;

http.createServer(mainHandler).listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
});
=======
const Hapi = require('hapi');
const server = new Hapi.Server();
const conncrea = require('./app/dbutils/client.js');

server.connection({port:process.env.PORT||8080 });

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {

    return reply("Hello");
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
if (!module.parent) {
server.start(error => {
  console.log(error);
  process.exit(1);
});
}

module.exports = server;
>>>>>>> 2c9a6157179f4ad4153a24eb40f4e0de61feba8b
