/*
 * static content module
 *
 */
var fs = require('fs');

module.exports = function(request, response){
  var url,
      file,
      prefix,
      ext,
      fullPath,
      REGEX,
      contentTypeMapper,
      contentType,
      encoding,
      path=[];

  REGEX = /(.*)(?:\.([^.]+$))/;

  contentTypeMapper = {
    html: {
      contenttype: 'text/html',
      encoding: 'utf8'
    },
    jpg: {
      contenttype: 'image/jpeg',
      encoding: null
    },
    jpeg: {
      contenttype: 'image/jpeg',
      encoding: null
    },
    png: {
      contenttype: 'image/png',
      encoding: null
    },
    css: {
      contenttype: 'text/css',
      encoding: 'utf8'
    },
    js: {
      contenttype: 'text/javasctipt',
      encoding: 'utf8'
    },
  };

  url = request.url;

  // set root to => '/views/index.html'
  if(url === '/') url = '/views/index.html';
  path = url.split('/');
  path.shift();
  fullPath = path.join('/');
  file = path.pop();

  // Guard if path or filename contains 'private'
  if(path.indexOf('private') >= 0){
    response.writeHead(404, {'Content-type': 'text/plain'});
    response.end(`File not found. ;( ${request.url}`);
    return;
  }



  // Guard if file does not exist
  try{
    fs.accessSync(fullPath);
  } catch(e){
    response.writeHead(404, {'Content-type': 'text/plain'});
    response.end(`File not found. ;O  ${request.url}`);
    return;
  }


  prefix = file.match(REGEX)[1];
  ext = file.match(REGEX)[2];
  contentType = contentTypeMapper[ext];



  if(contentType == null || contentType == undefined){
    response.writeHead(404, {'Content-type': 'text/plain'});
    response.end(`Unknown Content Type. (；´Д｀) ${file} ${request.url}`);
    return;
  }

  endoding = encoding || null;

  // send data
  fs.readFile(fullPath, contentType[endoding], function(error, contents){
     response.writeHead(200, {'Content-type': contentType.contenttype});
     response.write(contents);
     response.end();
  })
  return;


};
