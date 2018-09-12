var express = require('express');
var User = require('models/user').User;
var HttpError = require('error').HttpError;
var async = require('async');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/login', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  async.waterfall([
    function(callback) {
      User.findOne({ username: username }, callback);
    },
    function(user, callback) {
      if (user) {
        if (user.checkPassword(password)) {
          callback(null, user);
        } else {
          next(new HttpError(403, "Incorrect password"));
        }
      } else {
        var user = new User({username: username, password: password});
        user.save(function(err) {
          if (err) return next(err);
          callback(null, user);
        });
      }
    }
  ], function(err, user) {
    if (err) return next(err);
    req.session.user = user._id;
    res.send({});
  });
});

module.exports = router;
