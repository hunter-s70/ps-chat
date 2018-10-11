var session = require('express-session');
var mongoose = require('libs/mongoose');
var MongoStore = require('connect-mongo')(session); // to save session in DB
var storeSession = new MongoStore({mongooseConnection: mongoose.connection});

module.exports = storeSession;