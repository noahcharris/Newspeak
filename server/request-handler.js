

module.exports = function (request, response) {
  console.log('serving ' + request.method + ' request at ' + request.url);
  response.writeHead(200, {'Content-type':'text/plain'});
  console.log('hi');
  response.end('Hello world!');
}