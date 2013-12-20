var
  url     = require('url'),
  router  = require('./router').router;

//var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME,
//   user: process.env.RDS_USERNAME,
//   password: process.env.RDS_PASSWORD,
//   port: process.env.RDS_PORT
// });

//connection.connect();



module.exports = function (request, response) {
  console.log('serving ' + request.method + ' request at ' + request.url);
  
  var pathname = url.parse(request.url).pathname;

  if(router[pathname]){
    var handler = router[pathname];
    handler(request, response, pathname);
  } else {
    // 404
  }
};

