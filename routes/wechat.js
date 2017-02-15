var express = require('express');
var router = express.Router();
const config = require('../config/wechat.js');
const crypto = require('crypto');
const url = require('url');
// var wechat = require('wechat');
// get方法用来验证url合法性
router.get('/', function(req, res, next) {

  wechatAuth(req, res);
});
// post方法用来接受微信消息
router.post('/',function(req,res,next){
	console.log('请求路径');
	console.log(req.body);
	req.json(req);
});
module.exports = router;
// 功能性函数
//进行sha1加密
function sha1(str) {
  var shasum = crypto.createHash("sha1");
  shasum.update(str);
  str = shasum.digest("hex");
  return str;
}

function wechatAuth(req, res) {
  var query = url.parse(req.url, true).query;
  var signature = query.signature;
  var echostr = query.echostr;
  var timestamp = query['timestamp'];
  var nonce = query.nonce;

  var reqArray = [nonce, timestamp, config.token];

  //对数组进行字典排序
  reqArray.sort();
  var sortStr = reqArray.join(''); //连接数组
  var sha1Str = sha1(sortStr);

  if (signature === sha1Str) {
    res.end(echostr);
    console.log(echostr);
  } else {
    res.end("false");
    console.log("授权失败!");
  }
}
