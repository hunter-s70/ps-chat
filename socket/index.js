var config = require('config');
var async = require('async');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var sessionStore = require('libs/sessionStore');
var HttpError = require('error').HttpError;
var User = require('models/user').User;


function loadSession(sid, callback) {
  // sessionStore callback is not quite async-style!
  sessionStore.load(sid, function(err, session) {
    // console.log(session);
    if (arguments.length == 0) {
      // no arguments => no session
      return callback(null, null);
    } else {
      return callback(null, session);
    }
  });
}

function loadUser(session, callback) {
  if (!session.user) {
    // log.debug("Session %s is anonymous", session.id);
    return callback(null, null);
  }
  // log.debug("retrieving user ", session.user);

  User.findById(session.user, function(err, user) {
    if (err) return callback(err);
    
    if (!user) {
      return callback(null, null);
    }
    // log.debug("user findbyId result: " + user);
    callback(null, user);
  });
  
}

module.exports = function(server) {
  var io = require('socket.io').listen(server);

  // socket.io configuration
  io.set('origins', 'localhost:*');
  // io.set('logger', log);
  
  io.use(function(socket, next) {
    var handshake = socket.handshake;

    async.waterfall([
      function(callback) {
        // convert handshake to the object
        handshake.cookies = cookie.parse(handshake.headers.cookie || '');
        var sidCookie = handshake.cookies[config.get('session:name')];
        var sid = cookieParser.signedCookies({sidCookie}, config.get('session:secret'));
      
        loadSession(sid.sidCookie, callback);
      },
      function(session, callback) {
        if (!session) {
          callback(new HttpError(401, "No session"));
        }
      
        handshake.session = session;
        loadUser(session, callback);
      },
      function(user, callback) {
        if (!user) {
          callback(new HttpError(403, "Anonymous session may not connect"));
        }
      
        handshake.user = user;
        callback(null);
      }
    ], function(err) {
      if (!err) {
        return next();
      }
    
      if (err instanceof HttpError) {
        return next(err);
      }
  
      next(err);
    });
  });

  // can't emit this event with $emit (deprecated)
  io.sockets.on('session:reload', function(sid) {
    var clients = io.sockets.clients();

    clients.forEach(function(client) {
      if (client.handshake.session.id != sid) return;
      
      loadSession(sid, function(err, session) {
        if (err) {
          client.emit("error", "server error");
          client.disconnect();
          return;
        }
        
        if (!session) {
          client.emit("logout");
          client.disconnect();
          return;
        }
        
        client.handshake.session = session;
      });
      
    });
    
  });

  io.on('connection', function(socket) {
    var username = socket.handshake.user.get('username');
    socket.broadcast.emit('join', username);

    socket.on('message', function(msg, callback) {
      socket.broadcast.emit('new message', username, msg); // send to all connections except current
      callback('sended-data');
    });

    socket.on('disconnect', function() {
      socket.broadcast.emit('leave', username);
    });
  });
  
  return io;
};
