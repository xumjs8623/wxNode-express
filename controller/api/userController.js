// sql 封装
var sql = require('../../common/dbMysql');
// 引入时间格式化插件
var moment = require('moment');

var jwt = require('jsonwebtoken')
// 引入返回模板
var resTpl = require('./resTpl.js');
// 加密模块
var crypto = require('crypto');		//引入  crypto 模块
var md5 = function (data) { 	//定义加密函数
  return crypto.createHash('md5').update(data).digest('hex').toLowerCase();
}
// 登录模块
exports.loginUser = function (req, res, next) {
  if (req.session) {
    res.json(resTpl('success', '已经登录'));
  } else {
    sql("SELECT * FROM user WHERE username = ?", [req.body.username])
      .then((data) => {
        switch (data.length) {
          case 1:
            if (md5(req.body.password) == data[0].password) {
              // 更新用户表，添加最后登录时间
              sql("UPDATE user SET logintime = ? WHERE username = ?", [moment().format('YYYY-MM-DD HH:mm:ss'), req.body.username]);
              const mytoken = jwt.sign({ username: req.body.username }, 'xuminjun', { expiresIn: '1d' });
              // 返回成功状态码
              res.cookie('token', mytoken);
              res.json({ code: 1 });
            } else {
              res.json(resTpl('error', '密码错误'));
            }
            break;
          case 0:
            res.json(resTpl('error', '账号不存在'));
            break;
          default:
            res.json(resTpl('error', '网络错误'));
            break;
        }
      }).catch((data) => {
        console.log(data);
      })
  }

};
// 重置账户密码
exports.reset = function (req, res, next) {
  var password = md5('admin');
  sql("INSERT INTO user (name, username, password) VALUES ('mj', 'admin', '" + password + "')", function (data) {
    res.json(data);
  });
}
// 测试模块
exports.test = function (req, res, next) {
  // console.log(req);
  // const mytoken = req.headers.token;
  // const decoded = jwt.verify(mytoken, 'xuminjun');
  // console.log(decoded);
  res.send('111');
}