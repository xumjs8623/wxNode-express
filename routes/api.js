var express = require('express');
var router = express.Router();

var apiSend=require('../action/apiSend.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  apiSend(res);
});
module.exports = router;
