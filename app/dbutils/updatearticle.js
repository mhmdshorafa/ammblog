

var cl = require('./client.js');
module.exports = function selectarticle(cb) {
    var sqlQuery = `UPDATE article
  SET text=${text} WHERE id=${id}`;
  var selectuse = cl.client.query(sqlQuery, function(err, result) {
        if (err) {
            cb(err, '[ext:do');
        }
        cb(err, result.rows);
    });

}
