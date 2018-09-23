var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var HttpError = require('error').HttpError;

// sessions settings
var session = require('express-session');
var config = require('config');
var mongoose = require('libs/mongoose');
var MongoStore = require('connect-mongo')(session); // to save session in DB

// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var chatRouter = require('./routes/chat');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
  secret: config.get('session:secret'),
  name: config.get('session:name'),
  resave: config.get('session:resave'),
  saveUninitialized: config.get('session:saveUninitialized'),
  cookie: config.get('session:cookie'),
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('middleware/loadUser'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if (typeof err === 'number') {
    err = new HttpError(err);
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') !== 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
