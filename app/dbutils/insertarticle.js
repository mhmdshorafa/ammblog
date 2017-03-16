var cl = require('./client.js');
module.exports = function insertarticle(user, cb) {
    console.log(user);
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
    console.log(sqlQuery);
    var insertrw = cl.client.query(sqlQuery, function(err) {
        if (err) {
            cb(err, '[ext:do');
        }
        cb(err, '[{text:done}]');
    });
}
