var cl = require('./client.js');
module.exports = function selectarticle(cb) {
    var sqlQuery = `SELECT *
  FROM article`;
    var selectuse = cl.client.query(sqlQuery, function(err, result) {
        if (err) {
            cb(err, '[ext:do');
        }
        cb(err, result.rows);
    });

}
