var cl = require('./client.js');

function insertuser(user, cb) {
    var sqlStr = Object.keys(user).map(key => user[key]).map(elem => `'${elem}'`).join(',');
    var sqlQuery = `INSERT INTO usersdetails (
  fname,
  lname,
  email,
  gend,
  mobile,
  password,
  dob) VALUES (${sqlStr})`;
  console.log(sqlQuery);
    var insertrw = cl.client.query(sqlQuery, function(err) {
        if (err) {
          cb(err ,'[ext:do');
        }
        cb(err ,'[{text:done}]');
    });
}

function selectuser(user, cb) {
    var all = `SELECT *
  FROM usersdetails`;
    var sqlQuery = `SELECT id,
  fname,
  lname,
  email,
  gend,
  mobile,
  password,
  dob
  FROM usersdetails
  WHERE email = '${user[0]}'
  AND password = '${user[1]}'`;
    console.log(user);
    console.log(sqlQuery);

    var selectuse = cl.client.query(sqlQuery, function(err, result) {
      if (err) {
        cb(err ,'[ext:do');
      }
        cb(err, result.rows[0]);
    });

}

function insertpost(post, cb) {
console.log(post);
    var id = parseInt(post[1]);


    var sqlQuery = `INSERT INTO posts (
    text,
  userid) VALUES ('${post[0]}',${id})`;
    var salrw = cl.client.query(sqlQuery, function(err) {
      if (err) {
        cb(err ,'[ext:do');
      }
        cb(err ,'[{text:done}]');
    });
}

function allpost(id, cb) {

    var all = `SELECT *
  FROM usersdetails`;
    var sqlQuery = `SELECT text
  FROM posts where userid=${id[0]}

  `;
    console.log(sqlQuery);
    var allposts = cl.client.query(sqlQuery, function(err, result) {
      if (err) {
        cb(err ,'[ext:do');
      }
        cb(err, result.rows);
    });

}

module.exports = {
    insertuser: insertuser,
    client: cl.client,
    selectuser: selectuser,
    insertpost: insertpost,
    allpost: allpost
}
