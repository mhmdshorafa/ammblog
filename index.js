const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({host:'localhost', port: 8080 });

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {

 reply("Hello");
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
  process.exit(1);
});
}

module.exports = server;
