var http = require('http');
var handlers

var port = process.env.PORT || 8888;

var ip = '127.0.0.1';

var server = http.createServer(require('./request-handler.js'));
console.log('Server running on ' + ip + ':' + port);
server.listen(port);