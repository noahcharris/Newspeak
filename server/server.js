
var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes.js');


app = express();

app.get('/', function(request, response) {
  response.send('Hello world!');
});

app.get('/collocation', routes.collocation);
app.get('/frequency', routes.frequency);

app.listen(8080);
console.log('express server listening on port %s', app.get('port'));