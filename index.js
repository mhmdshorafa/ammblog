const Hapi = require('hapi');
const server = new Hapi.Server();

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

server.start(()=>{console.log('listento port');});


module.exports = server;
