var pg = require('pg');

var createclient = (config) => {
  var client = new pg.Client(config);
  client.connect();
  return client;
}


function createtables(client, cb) {
  var usersquery = client.query(`CREATE TABLE IF NOT EXISTS article(
    id SERIAL PRIMARY KEY,
    title varchar(255),
    img varchar(255),
    time varchar(32),
    text varchar(8000),
    category varchar(55),
    likes integer,

    doa date)`, function(err,result) {

        if (err) throw err;

        cb(err,result);
    });

}
function insertarticle(user,client, cb) {

    var sqlStr = Object.keys(user).map(key => user[key]).map(elem => `'${elem}'`).join(',');
    var sqlQuery =
        `INSERT INTO article (
      title,
      img,
      time,
      text,
      category,
      likes,
      doa) VALUES (${sqlStr})`;

    var insertrw = client.query(sqlQuery, function(err,result) {
        if (err) {
            cb(err, result);
        }
        cb(err, result);
    });
}
function selectarticle(id ,client, cb) {

   var sqlQuery ;
   if(id == -1){
     sqlQuery = `SELECT *
     FROM article`;
   } else {
     sqlQuery = `SELECT id,title,img,text
     FROM article where id=${id}`;
   }
   console.log(sqlQuery);

    var selectuse = client.query(sqlQuery, function(err, result) {
        if (err) {
            cb(err, result);
        }
        cb(err, result.rows);
    });

}
function deletearticle(id,client, cb) {
    var sqlQuery = `DELETE
  FROM article WHERE id=${id}`;
    var selectuse = client.query(sqlQuery, function(err, result) {
        if (err) {
            cb(err, '[ext:do');
        }
        cb(err, result);
    });


}
function filterarticle(val ,client, cb) {
  console.log(cb);


    var sqlQuery = `SELECT id,title,img,text,category
     FROM article where category='${val}'`;

   console.log(sqlQuery);

    var selectuse = client.query(sqlQuery, function(err, result) {
        if (err) {
            cb(err, '[ext:do');
        }
        cb(err, result.rows);
    });

}
function updatearticle(arr , client,cb) {
    var sqlQuery = `UPDATE article
  SET  title='${arr[0]}',img='${arr[1]}',text='${arr[2]}' WHERE id=${arr[3]}`;

  console.log(sqlQuery);
    var selectuse = client.query(sqlQuery, function(err, result) {
        if (err) {
            cb(err, '[ext:do');
        }
        cb(err, result);
    });

}




module.exports = {

    createclient: createclient,
    createtables: createtables,
    insertarticle: insertarticle,
    selectarticle: selectarticle,
    deletearticle: deletearticle,
    filterarticle: filterarticle,
    updatearticle: updatearticle


};
