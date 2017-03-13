const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({host:'localhost', port: 8080 });
server.route({
  method: 'POST',
  path: '/subscribe',
  handler: (request, reply) => {
    return reply({
      result: 'success'
    });
  }
});
if (!module.parent) {
server.start(error => {
  process.exit(1);
});
}

module.exports = server;
