
var express = require('express');
var handler = require('./request-handler.js');


app = express.createServer();

app.get('/', function(request, response) {
  response.send('Hello world!');
});

//binds to 3000 by default
app.listen(8080);
console.log('express server started listening...');