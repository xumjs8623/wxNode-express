var express = require('express');
var router = express.Router();

var moment=require('moment');

var apiSend=require('../controller/api/apiSend.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  apiSend(res);
});
router.get('/test',function(req,res,next){
  res.send(moment().format("YYYY-MM-DD HH:mm:ss"));
});
module.exports = router;
