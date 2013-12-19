
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT
});





module.exports = function (request, response) {
  console.log('serving ' + request.method + ' request at ' + request.url);
  response.writeHead(200, {'Content-type':'text/plain'});
  console.log('hi');
  response.end('Hello world!');
}