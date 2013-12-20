
var express = require('express');
var handler = require('./request-handler.js');


app = express.createServer();

app.get('/', function(request, response) {
  response.send('Hello world!');
});

app.listen(8080);
console.log('express server started listening...');



var pg = require('pg');

var conString = 'postgres://noahharris@localhost:5432/noahharris';

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
  });
});