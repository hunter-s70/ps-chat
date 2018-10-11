var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var HttpError = require('error').HttpError;

// sessions settings
var session = require('express-session');
var config = require('config');
var sessionStore = require('libs/sessionStore');


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
  store: sessionStore
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('middleware/loadUser'));

require('routes')(app);

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
