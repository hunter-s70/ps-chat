module.exports = function(server) {
  var io = require('socket.io')(server);

  // socket.io configuration
  io.set('origins', 'localhost:*');
  // io.set('logger', log);

  io.on('connection', function(socket) {
    socket.on('message', function(msg, callback) {
      socket.broadcast.emit('new message', msg); // send to all connections except current
      callback('sended-data');
    });
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });
};
