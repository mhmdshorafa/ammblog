var hapi = require('hapi');

var server = new hapi.Server();
server.connect(){
  host:'localhost',
  port:8080
}

server.start(()=>{
  console.log("listen to localhost:8080");
});
