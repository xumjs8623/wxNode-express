var express = require('express');
var router = express.Router();
var moment=require('moment');
var request = require('request');
var sql = require('../common/dbMysql.js');
var apiSend=require('../controller/api/apiSend.js');
var upload = require('../common/multerUpload.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  apiSend(res);
});
router.get('/up', function(req, res,next){
	res.send('成功');
});
// 上传接口
router.post('/upload', function(req, res, next){
	upload(req, res);
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
