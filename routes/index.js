var express = require('express');
var router = express.Router();
path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../views/index.html'));
});

module.exports = router;
