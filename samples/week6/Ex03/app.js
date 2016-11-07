var http = require('http');
var url = require('url');
var fs = require('fs');


var server = http.createServer(function(request,response){
  var queryObject = url.parse(request.url,true).query;
  fs.readFile('./data.json', 'utf8', function(err, data){
    response.end(queryObject.callback+'('+JSON.stringify(data)+')');
  });
  
});
server.listen(8080);