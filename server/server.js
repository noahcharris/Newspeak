
var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes.js');


app = express();
app.set('port', 8080);

app.use(function(request, response, next) {
  console.log('received '+request.method+' request at '+request.url);
  next();
});

app.use(express.favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', function(request, response) {
  response.send('Hello world!');
});

app.get('/collocation', routes.collocation);
app.get('/frequency', routes.frequency);
app.post('/data', routes.receiveData);

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'));
console.log('express server listening on port %s', app.get('port'));