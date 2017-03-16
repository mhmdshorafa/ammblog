var moment = require('moment');
module.exports= (request)=>{

  var arr = [];
  var now = moment()
  var date = now.format('YYYY-MM-DD');
  var time = now.format('HH:mm');
  arr.push(request.payload.arttitle);
  arr.push(request.payload.artimg);
  arr.push(time);
  arr.push(request.payload.content);
  arr.push(request.payload.category);
  arr.push(0);
  arr.push(date);

  return arr;
}
