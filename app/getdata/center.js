//var query = require('../dbutils/operations.js');
var parseb = require('./parsebody.js');

module.exports = (req, res) => {
    parseb.parse(req, (err, body) => {
      body = JSON.parse(body);
      var fn = body[body.length-1];
      body.pop();
      query[fn](body, (err, inform) => {
        console.log(body);
          //  res.end(JSON.stringify(inform));
        });
    });
}
