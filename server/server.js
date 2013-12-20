
var express = require('express');
var http = require('http');
var path = require('path');
var handler = require('./dbtest.js');
//var routes = require('./routes');


app = express.createServer();

app.get('/', function(request, response) {
  response.send('Hello world!');
});

app.get('/collocation', function(request, response) {
  response.send('COLLOCATIONS!');
});

app.listen(8080);
console.log('express server listening on port %s', app.get('port'));