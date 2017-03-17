'use strict';
var pg = require('pg');
var test = require('tape');
var connect = require('../app/dbutils/connect.js')
var config = require('../app/dbutils/config.js')

var arr = ['Test DB ',
    'bird.jpg',
    '08:46',
    'Test Article works',
    'Node JS Test',
    0,
    '2017-03-16'
];

var client = connect.createclient(config.test);
test('DB test | db.createTable(): should create a new table', function(t) {
    connect.createtables(client, function(err, res) {
        t.equal(res.command, 'CREATE', 'DB Table Created & Test Data Inserted');
        t.end();
    });

});

test('DB test | insertarticle(): should insert a new article', function(t) {
    var result;

    connect.insertarticle(arr, client, (err, inform) => {
        t.equal(inform.command, 'INSERT', 'DB Table Created & Test Data Inserted');
        t.end();
    });


});

test('DB test | selectarticle(): should select article with specified id', function(t) {
    connect.selectarticle(1, client, (err, inform) => {
        console.log(inform);
        t.equal(inform[0].id, 1, 'Choose article with id 1 ');
        t.end();
    });

});
test('DB test | deletearticle(): should select article with specified id', function(t) {
    connect.deletearticle(1, client, (err, result) => {
        t.equal(result.command, 'DELETE', 'deleted article with id 1 ');
        t.end();
    });

});
test('DB test | filterarticle(): should fitler article with the same category', function(t) {
    connect.insertarticle(arr, client, (err, result) => {});
    connect.filterarticle('Node JS Test', client, (err, result) => {
        t.equal(result[0].category, 'Node JS Test', 'lost all articles in the same category ');
        t.end();
    });

});
test('DB test | updatearticle(): should fitler article with the same category', function(t) {
    connect.insertarticle(arr, client, (err, result) => {});
    var arr_update = ['Update DB ','bird.jpg','Test Article works',  1];
    connect.updatearticle(arr_update, client, (err, result) => {
        t.equal(result.command, 'UPDATE', 'update article with the specified id ');
        t.end();
    });

});



test.onFinish(() => {
    process.exit(0)
});
