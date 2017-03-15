var pg = require('pg');
var connect = require('./connect.js')
var config = require('./config.js')

var client = connect.createclient(config);
connect.createtable(client, (err) => {
    if (err) throw err;
});

module.exports = {
    client: client
}
