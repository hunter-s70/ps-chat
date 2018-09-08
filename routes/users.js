var express = require('express');
var router = express.Router();
var User = require('models/user').User;
var HttpError = require('error').HttpError;
var ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  User.find({}, (err, users) => {
  if (err) return next(err);
  res.json(users);
  });
});

// get user by id
router.get('/:id', function(req, res, next) {
  // res.send('respond with a resource');
  try {
    var id = new ObjectID(req.params.id);
  } catch(e) {
    return next(new HttpError(404, 'Incorrect user id'));
  }

  User.findById(id, (err, user) => {
    if (err) return next(err);
    if (!user) {
      next(new HttpError(404, 'User not found'));
    }
    res.json(user);
  });
});

module.exports = router;
