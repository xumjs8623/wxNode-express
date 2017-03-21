var express = require('express');
var router = express.Router();
var moment=require('moment');

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
	let data = sql('SELECT * FROM user', '' , function(row){
		// res.json(row)
		var data = {};
		data['code'] = 1;
		data['data'] = row;
		res.json(data);
	});
})
module.exports = router;
