

function parser(req, callback){
  console.log("inside parse");
    var body = '';

    req.on('data', function(data) {
        body += data;
    });
    req.on('end', function() {
      console.log("req.on",body);
      callback(null, body);
    });

}

module.exports = {
  parse:parser
}
