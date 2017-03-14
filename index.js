const Hapi = require('hapi');
const server = new Hapi.Server();
const conncrea = require('./app/dbutils/client.js');

server.connection({
  port: process.env.PORT || 8080
});

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
