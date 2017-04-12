// 刷新api中的token中间件
'use strict'
var author = require('../common/author');
var resTpl = require('../common/resTpl');
var auth = function (req, res, next) {
  if (req.url == '/api/login') {
    next();
  } else {
   author.refreshToken(req, res, next);
  }

}
module.exports = auth;
