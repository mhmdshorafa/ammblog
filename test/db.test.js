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


test('DB test | db.createTable(): should create a new table', t => {
var create =   connect.createtable(client, function(err, result) {});
t.ok(create,'table is created succesfully');
t.end();
});
// // test('db.insertdata(): insert data in info table', t => {
//   db.insertdata(client,`INSERT INTO info (first_name,last_name,dob,gender,about,image_url,friends,username,password) VALUES ('test','test','11-11-2000','m','','www.google.com','0','test','test');`,(errInsert, resInsert) => {
//     t.notOk(errInsert, 'no errors');
//     t.ok(resInsert, 'got res result');
//     client.end(() => {
//       t.end();
//     });
//   });
// });
// test('finish database client', t => {
//   client.end(() => {
//     t.pass('done, database down');
//     t.end();
// })
test.onFinish(() =>{});
