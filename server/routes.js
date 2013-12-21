
var pg = require('pg');
var url = require('url');

var conString = 'postgres://noahharris@localhost:5432/noahharris'; //database connection info
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

module.exports.collocation = function(request, response) {
  var query = url.parse(request.url, true).query;      //include true as second argument to parse query string

  response.send('hey');
};

module.exports.frequency = function(request, response) {
  var query = url.parse(request.url, true).query;

  response.send('yoyoyoy');
};

module.exports.receiveData = function(request, response) {

};






/*  postgres stuff

CREATE TABLE ObamaWords (
  id      SERIAL PRIMARY KEY,
  word    varchar(25),
  collo1  integer,
  collo2  integer,
  collo3  integer,
  collo4  integer,
  collo5  integer,
  year1   integer,
  year2   integer,
  year3   integer,
  year4   integer,
  year5   integer,
  year6   integer,
  year7   integer,
  year8   integer
);

INSERT INTO words (word, collo1, collo2, collo3, collo4, collo5, year1, year2, year3, year4, year5, year6) VALUES ('freedom',3,666,7,82,853,32,21,8473,32,1,2);

*/