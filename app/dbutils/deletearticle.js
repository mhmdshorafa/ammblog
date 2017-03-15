var cl = require('./client.js');
module.exports = function selectarticle(id, cb) {
    var sqlQuery = `DELETE
  FROM article WHERE id=${id}`;
    var selectuse = cl.client.query(sqlQuery, function(err, result) {
        if (err) {
            cb(err, '[ext:do');
        }
        cb(err, [{
            done: 'deleted'
        }]);
    });

}
