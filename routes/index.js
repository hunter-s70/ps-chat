var indexRouter = require('routes/main');
var usersRouter = require('routes/users');
var loginRouter = require('routes/login');
var logoutRouter = require('routes/logout');
var chatRouter = require('routes/chat');

module.exports = function(app) {
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/login', loginRouter);
  app.use('/logout', logoutRouter);
  app.use('/chat', chatRouter);
};
