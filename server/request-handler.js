
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT
});

connection.connect();



module.exports = function (request, response) {
  console.log('serving ' + request.method + ' request at ' + request.url);
  response.writeHead(200, {'Content-type':'text/plain'});

  // connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  // if (err) throw err;

  // response.end('The solution is: ' + rows[0].solution);
  response.end("hhihihihi");
});
}