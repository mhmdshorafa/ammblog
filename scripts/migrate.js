'use strict';
var pg = require('pg');
var connect = require('../app/dbutils/connect.js')
var config = {
<<<<<<< HEAD
    database: 'test',
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
=======
  database: 'test',
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: '5432',
>>>>>>> 9457ede9f90d5215f7fdfe888c239a5e38d96d38

}

var client = connect.createclient(config);

<<<<<<< HEAD
connect.createtables(client, function(err,res) {
  console.log('migrate',res);
});
=======
connect.createtables(client, function(err, data) {});
>>>>>>> 9457ede9f90d5215f7fdfe888c239a5e38d96d38
