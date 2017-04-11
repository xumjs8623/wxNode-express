var express = require('express');
// 引入路由
var router = express.Router();
// 引入时间格式化插件
var moment=require('moment');
// 发送请求插件
var request = require('request');
// mysql 封装插件
var sql = require('../common/dbMysql.js');
// api发送控制器
var apiSend=require('../controller/api/apiSend.js');
// 上传插件
var upload = require('../common/multerUpload.js');
// 引入用户控制器
var userControl = require('../controller/api/userController');
var ExpressJwt = require('express-jwt');
/* GET home page. */
router.get('/', function(req, res, next) {
  apiSend(res);
});

// 登录接口
router.post('/login', userControl.loginUser);
// 上传到本地服务器
router.post('/upload', upload);
// 初始化设置用户名和密码
router.get('/setUser/*',userControl.reset);
// 接口测试
router.post('/test', userControl.test);
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
