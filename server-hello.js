var http = require('http');
var counter = 0;
var server = new http.Server();

server.listen(3333, '127.0.0.1');

server.on('request', function(req, res) {
    res.end('Hello world!' + ++counter);
});
