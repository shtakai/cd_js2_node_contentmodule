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
      path=[];

  REGEX = /(.*)(?:\.([^.]+$))/;

  contentTypeMapper = {
    html: {
      contenttype: 'text/html',
      encoding: 'utf8'
    },
    jpg: {
      Contenttype: 'image/*',
      encoding: null
    },
    jpeg: {
      Contenttype: 'image/*',
      encoding: null
    },
    css: {
      Contenttype: 'text/css',
      encoding: 'utf8'
    },
    js: {
      Contenttype: 'text/javasctipt',
      encoding: 'utf8'
    },
  };

  url = request.url;
  if(url === '/') url = '/views/index.html';
  path = url.split('/');
  path.shift();
  fullPath = path.join('/');
  file = path.pop();
  prefix = file.match(REGEX)[1];
  ext = file.match(REGEX)[2];
  contentType = contentTypeMapper[ext];

  try{
    fs.accessSync(fullPath);
    console.log('okay');
  } catch(e){
    console.log('ng',e);
  }


  console.log(`request: ${request}  response:${response}`);
  console.log(`path: ${path}`);
  console.log(`fullPath: ${fullPath}`);
  console.log(`file: ${file}`);
  console.log(`prefix: ${prefix}`);
  console.log(`ext: ${ext}`);
  console.log(`contenttype: ${JSON.stringify(contentType)}`);


};
