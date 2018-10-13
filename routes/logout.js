var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  // var sid = req.session.id;
  // var io = req.app.get('io');
  req.session.destroy(function(err) {
    // io.sockets.emit('session:reload', sid);
    if (err) return next(err);
    res.redirect('/'); // needed send post form from FE
  });
});

module.exports = router;
