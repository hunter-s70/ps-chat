var express = require('express');
var router = express.Router();
var User = require('models/user').User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  User.find({}, (err, users) => {
  if (err) return next(err);
  res.json(users);
  });
});

module.exports = router;
