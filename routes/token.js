var express = require('express');
var router = express.Router();
var isLegel = function(signature, timestamp, nonce) {
  var TOKEN = 'tnwechattest';
  var arr = [TOKEN, timestamp, nonce];
  // 对三个参数进行字典序排序
  arr.sort();
  // sha1 加密
  var sha1 = crypto.createHash('sha1');
  var msg = arr[0] + arr[1] + arr[2];
  sha1.update(msg);
  msg = sha1.digest('hex');
  // 验证
  if (msg == signature) {
    console.log('验证成功');
    return true;
  } else {
    console.log('验证失败');
    return false;
  }
};
/* GET home page. */
router.get('/', function(req, res, next) {
  // 获取GET请求的参数
  var url_params = url.parse(req.url, true);

  console.log(req.url);

  var query = url_params.query;

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log('Query params:' + query.signature + query.timestamp + query.nonce);

  if (isLegel(query.signature, query.timestamp, query.nonce)) {
    // 返回echostr
    res.end(query.echostr);
  } else {
    //
    res.end('Hello world\n');
  }
});
module.exports = router;
