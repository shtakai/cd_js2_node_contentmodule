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

  console.log(`request: ${request}  response:${response}`);
  console.log(`path: ${path}`);
  console.log(`fullPath: ${fullPath}`);
  // Guard if file does not exist
  try{
    fs.accessSync(fullPath);
    console.log('okay');
  } catch(e){
    console.log('ng',e);
    response.writeHead(404);
    response.end(`File not found. ;O  ${request.url}`);
    return;
  }


  file = path.pop();
  prefix = file.match(REGEX)[1];
  ext = file.match(REGEX)[2];
  contentType = contentTypeMapper[ext];

  if(contentType == null || contentType == undefined){
    console.log(`Unknown Content Type. (；´Д｀) ${file} ${request.url}`);
    response.writeHead(404);
    response.end(`Unknown Content Type. (；´Д｀) ${file} ${request.url}`);
    return;
  }
  console.log(`file: ${file}`);
  console.log(`prefix: ${prefix}`);
  console.log(`ext: ${ext}`);
  console.log(`contenttype: ${JSON.stringify(contentType)}`);
  console.log(`contenttype: ${contentType[encoding]}`);
  console.log(`contenttype: ${contentType.contenttype}`);

  endoding = encoding || null;


  // send data
  fs.readFile(fullPath, contentType[endoding], function(error, contents){
    console.log(`send data`);
     response.writeHead(200, {'Content-type': contentType.contenttype});
     response.write(contents);
     response.end();
  })
  return;


};
