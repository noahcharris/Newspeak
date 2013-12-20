var fs = require('fs');

var headers = {};

var readFile = function(response, pathname) {
  response.writeHead(200, headers);
  pathname = '..' + pathname;
  fs.readFile(pathname, function (err, data) {
    if (err) {
      response.writeHead(500, headers);
      return response.end('Error loading' + pathname);
    }
    response.end(data);
  });
}

var htmlFiles = function(request, response, pathname){
	headers['Content-Type'] = "text/html";
  if (pathname === '/') { pathname = '/client/index.html'; }
  readFile(response, pathname);
};

var jsFiles = function(request, response, pathname) {
  headers['Content-Type'] = "application/javascript";
  readFile(response, pathname);
};

var css = function(request, response, pathname) {
  headers['Content-Type'] = "text/css";
  readFile(response, pathname);
};

var testOne = function(request, response, pathname) {

  console.log(request.url);
};

var router = {
  '/': htmlFiles,
  '/client/templates/main.html': htmlFiles,
  '/client/templates/collocation.html': htmlFiles,
  '/client/templates/frequency.html': htmlFiles,
  '/client/main.js': jsFiles,
  '/client/controllers.js': jsFiles,
  '/client/directive.js': jsFiles,
  '/client/grabSOTUinfo.js': jsFiles,
  '/client/charts/practiceChart.js': jsFiles,
  '/client/charts/collocationChart.js': jsFiles,
  '/client/charts/frequencyChart.js': jsFiles,
  '/client/style.css': css,
  '/collocation': testOne,
  '/frequency': testOne
};


exports.router = router;
