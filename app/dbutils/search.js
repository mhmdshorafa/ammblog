var cl = require('./client.js');
module.exports = function selectarticle(val, cb) {
  var sqlQuery = `SELECT id,title,img,text,category
     FROM article where category='${val}'`;
  var selectuse = cl.client.query(sqlQuery, function(err, result) {
    if (err) {
      cb(err, '[ext:do');
    }
    cb(err, result.rows);
  });

}
