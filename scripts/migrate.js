'use strict';
var pg = require('pg');
var connect = require('../app/dbutils/connect.js')
var config = {
  database: 'test',
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: '5432',

}

var client = connect.createclient(config);

connect.createtables(client, function(err, data) {});
