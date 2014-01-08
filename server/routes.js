
var pg = require('pg');
var url = require('url');

var conString = 'postgres://awsuser:mypassword@mydbinstance.cxod0usrhuqb.us-west-1.rds.amazonaws.com:5432/mydb';

var client = new pg.Client(conString);


// client.connect(function(err) {     //this was interfering with my code down there???
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].theTime);
//     //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//     client.end();
//   });
// });

client.connect();

module.exports.words = function(request, response) {
  var queryArgs = url.parse(request.url, true).query;
  client.query("SELECT word FROM " + queryArgs.president + ";", function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    var temp = [];
    for (var i=0;i<result.rows.length;i++) {
      temp.push(result.rows[i].word);
    }
    response.json(temp);
  });
};

module.exports.collocation = function(request, response) {
  var queryArgs = url.parse(request.url, true).query;
  console.log(queryArgs);

  client.query("SELECT * FROM " + queryArgs.president + " WHERE word = '" + queryArgs.word + "';", function(err, result) {
    if (err) {
      return console.error('error running query', err);
    }
    var row = result.rows[0];
    console.log(row);
    if (row !== undefined) {
      response.json([row.word, row.collo1, row.collo2, row.collo3, row.collo4, row.collo5]); 
    } else {
    response.json([]);
    }
  });
};

module.exports.frequency = function(request, response) {
  var queryArgs = url.parse(request.url, true).query;
  console.log(queryArgs);

  client.query("SELECT * FROM " + queryArgs.president + " WHERE word = '" + queryArgs.word + "';", function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    var row = result.rows[0];
    console.log(row);
    if (row === undefined) {
      response.json([]);
      response.end();
    } else {
    response.json([row.word, row.year1, row.year2, row.year3, row.year4]); //need to make this dynamic depending on how much data is returned
    }
  });
};

module.exports.receiveData = function(request, response) {
  console.log(JSON.parse(request.body));
  response.writeHead(200);
  response.end('Post successful!');

};






/*  postgres stuff

change the collo entries to integers corresponding to the key of each word

CREATE TABLE Obama (
  id      SERIAL PRIMARY KEY,
  word    varchar(25),
  collo1  varchar(25),
  collo2  varchar(25),
  collo3  varchar(25),
  collo4  varchar(25),
  collo5  varchar(25),
  year1   integer,
  year2   integer,
  year3   integer,
  year4   integer,
  year5   integer,
  year6   integer,
  year7   integer,
  year8   integer
);

INSERT INTO Obama (word, collo1, collo2, collo3, collo4, collo5, year1, year2, year3, year4, year5, year6, year7, year8) VALUES ('High','Liberty','Happiness','Superfluity','Security','Rapacity',21,84,32,1,2,24,75,32);

*/