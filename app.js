var http = require('http');
var fs = require('fs');
var port = 8000;
var static_contents = require('./lib/static_contents');

// creating server
server = http.createServer(function(request,response){
  static_contents(request, response);

});

// listen server on port
server.listen(port);
console.log(`running in localhost at port ${port}`);

