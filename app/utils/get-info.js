var date = require('./get-date.js')


function extractdata(jsondata) {
  var alldata = [];
  var member = [];
  var todayorders = [];
  var names = [];
  var data = jsondata.values;
  var currenthour = new Date();
  var mealcategory="breakfast";
  if(currenthour.getHours()<10){mealcategory = "lunch"}
  console.log("currenthour.getHours()",currenthour.getHours());

  data.forEach(function(elem) {
    for (var i = 0; i < elem.length -1; i++) {

      if (elem[i] == date.currentdate()[0]&&elem[1]== mealcategory ) {
        console.log(i,elem[i]);
        todayorders.push(elem[0]);
        names.push(elem[5]);
      }
    }
    alldata[0] = todayorders;
    alldata[1] = names;
  });
  return alldata;
}

function extractmembers(jsondata) {
  var member = [];
  var data = jsondata.values;
  data.forEach(function(elem) {
    for (var i = 0; i < elem.length - 1; i++) {
        member.push(elem[1]);
    }
  });
  return member;
}
module.exports = {
  extractdata: extractdata,
  extractmembers:extractmembers
}
