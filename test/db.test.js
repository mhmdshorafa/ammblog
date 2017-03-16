'use strict';
var test = require('tape');
var connect = require('../app/dbutils/connect.js')
var config = {
    database: 'test',
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: '5432',
}

var client = connect.createclient(config);
test('DB test | db.createTable(): should create a new table', function(t) {
    connect.createtables(client, function(err, data) {
        t.equal(data.command, 'CREATE', 'DB Table Created & Test Data Inserted');
        t.end();
    })
});

test.onFinish(() => {});
