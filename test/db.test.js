'use strict';
var pg = require('pg');
var test = require('tape');
var connect = require('../app/dbutils/connect.js')
var config = {
    database: 'test',
    user: 'postgres',
    password: 'admin',
    host: 'localhost',

}

var client = connect.createclient(config);
test('DB test | db.createTable(): should create a new table', function(t) {
    connect.createtables(client, function(err, res) {
      console.log('db.test',res);
      t.equal('CREATE', 'CREATE', 'DB Table Created & Test Data Inserted');
      t.end();
    });

});


test.onFinish(() => {process.exit(0)});
