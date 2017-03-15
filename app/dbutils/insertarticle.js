module.exports = function insertuser(user, cb) {
    var sqlStr = Object.keys(user).map(key => user[key]).map(elem => `'${elem}'`).join(',');
    var sqlQuery =
      `INSERT INTO article (
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
            cb(err, '[ext:do');
        }
        cb(err, '[{text:done}]');
    });
}
