var express = require('express');
var router = express.Router();
var checkAuth = require('middleware/checkAuth');

/* GET chat page. */
// using middleware in route. checkAuth
router.get('/', checkAuth, function(req, res, next) {
  res.render('pages/chat', {
    user: req.user
  });
});

module.exports = router;
