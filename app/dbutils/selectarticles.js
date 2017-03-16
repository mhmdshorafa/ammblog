var cl = require('./client.js');
module.exports = function selectarticle(id, cb) {
  var sqlQuery;
  if (id == -1) {
    sqlQuery = `SELECT *
     FROM article`;
  } else {
    sqlQuery = `SELECT id,title,img,text
     FROM article where id=${id}`;
  }
  var selectuse = cl.client.query(sqlQuery, function(err, result) {
    if (err) {
      cb(err, '[ext:do');
    }
    cb(err, result.rows);
  });

}
