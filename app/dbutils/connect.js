var pg = require('pg');

var createclient = (config) => {
  var client = new pg.Client(config);
  client.connect();
  return client;
}


function createtables(client, cb) {
  var usersquery = client.query(`CREATE TABLE IF NOT EXISTS article(
    id SERIAL PRIMARY KEY,
    title varchar(255),
    img varchar(255),
    time varchar(32),
    text varchar(8000),
    category varchar(55),
    likes integer,
    doa date)`, function(err) {
    console.log(err);
    if (err) throw err;
  });
}


module.exports = {
  createclient: createclient,
  createtables: createtables,

};
