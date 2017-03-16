
module.exports= (request)=>{
  var arr = [];
  var id = encodeURIComponent(request.params.id);
  arr.push(request.payload.arttitle);
  arr.push(request.payload.artimg);
  arr.push(request.payload.content);
  arr.push(id);

  return arr;
}
