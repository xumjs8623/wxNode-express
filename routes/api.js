var express = require('express');
var router = express.Router();
var moment=require('moment');
var request = require('request');
var sql = require('../common/dbMysql.js');
var apiSend=require('../controller/api/apiSend.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  apiSend(res);
});
router.get('/test',function(req,res,next){
  res.send(moment().format("YYYY-MM-DD HH:mm:ss"));
});
router.get('/local', function(req, res, next){
	sql('select * from user', function(data){
		res.json(data);
	})
});
router.get('/baidu', function(req, res, next){
	request('http://www.baidu.com',function(error, response, body){
		res.send(response)
	})
})
module.exports = router;
