var cl = require('./client.js');
module.exports = function insertarticle(user, cb) {
  var sqlStr = Object.keys(user).map(key => user[key]).map(elem => `'${elem}'`).join(',');
  var sqlQuery =
    `INSERT INTO article (
      title,
      img,
      time,
      text,
      likes,
      doa) VALUES (${sqlStr})`;
  var insertrw = cl.client.query(sqlQuery, function(err) {
    if (err) {
      cb(err, '[ext:do');
    }
    cb(err, '[{text:done}]');
  });
}
