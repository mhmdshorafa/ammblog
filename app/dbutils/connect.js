var pg = require('pg');

var createclient = (config) => {
    var client = new pg.Client(config);
    client.connect();
    return client;
}

function createtables(client, callback) {
        var usersquery = client.query(`CREATE TABLE IF NOT EXISTS article(
      id SERIAL PRIMARY KEY,
      title varchar(255),
      img varchar(255),
      time varchar(32),
      text varchar(8000),
      likes integer,
      doa date)`, function(err, result) {
            if (err) {
                return console.error('error running query', err);
            }
          //  client.end();
            return callback(err, result);
        });
    };


module.exports = {
    createclient: createclient,
    createtables: createtables,

};
