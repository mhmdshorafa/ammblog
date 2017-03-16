var cl = require('./client.js');
module.exports = function selectarticle(val , cb) {
  console.log(cb);


    var sqlQuery = `SELECT id,title,img,text,category
     FROM article where category='${val}'`;

   console.log(sqlQuery);

    var selectuse = cl.client.query(sqlQuery, function(err, result) {
        if (err) {
            cb(err, '[ext:do');
        }
        cb(err, result.rows);
    });

}
