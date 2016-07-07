var http = require('http');
var fs = require('fs');
var port = 8000;
var static_contents = require('./lib/static_contents');

// creating server
server = http.createServer(function(request,response){
  response.writeHead(200, {'Content-type': 'text/html'});
  console.log(`Request ${request.url}`);
  static_contents(request, response);

  //if(request.url === '/'){
    //fs.readFile('views/index.html', 'utf8', function(error,contents){
      //response.write(contents);
      //response.end();
    //});
  //} else if(request.url === '/dojo.html'){
    //fs.readFile('views/dojo.html', 'utf8', function(error, contents){
      //response.write(contents);
      //response.end();
    //});
  //} else if(request.url === '/stylesheet/style.css'){
    //fs.readFile('stylesheet/style.css', 'utf8', function(error, contents){
      //response.write(contents);
      //response.end();
    //});
  //} else{
    //response.end(`File not found. ${request.url}`);
  //}
});

// listen server on port
server.listen(port);
console.log(`running in localhost at port ${port}`);

