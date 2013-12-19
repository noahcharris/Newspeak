// var http = require('http');
// var handlers

// var port = process.env.PORT || 8888;

// var ip = '127.0.0.1';

// var server = http.createServer(require('./request-handler.js'));
// console.log('Server running on ' + ip + ':' + port);
// server.listen(port);
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end('Hello world');

}).listen(process.env.PORT || 8888);    