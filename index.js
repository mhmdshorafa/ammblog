const Hapi = require('hapi');
const server = new Hapi.Server();


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


  server.start(()=>{});
module.exports = server;
