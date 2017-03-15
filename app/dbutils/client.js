var pg = require('pg');
var connect = require('./connect.js')
var config = require('./config.js')

var client = connect.createclient(config);
connect.createtables(client,function (err, data) {});

module.exports = {
    client: client
}
