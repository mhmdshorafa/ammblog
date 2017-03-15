var cl = require('./client.js');
module.exports = function selectarticle(arr , cb) {
    var sqlQuery = `UPDATE article
  SET  title='${arr[0]}',img='${arr[1]}',text='${arr[2]}' WHERE id=${arr[3]}`;

  console.log(sqlQuery);
    var selectuse = cl.client.query(sqlQuery, function(err, result) {
        if (err) {
            cb(err, '[ext:do');
        }
        cb(err, [{done:'done'}]);
    });

}
