var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// 引入路由js
var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var app = express();
// 引入微信api集合和微信配置参数
var wechat = require('wechat');
var config=require('./config/wechat.js');
// 引入微信关键词回复模块
var wechatReply=require('./controller/wechat/reply.js');
// 设置静态资源和模板引擎
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// token令牌
// app.use('/wechat',wechat);

// 前台
app.use('/', index);
// 后台
app.use('/users', users);
// api接口
app.use('/api',api);
// 微信wechat
app.use('/wechat', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  console.log(message);
  wechatReply(message,req,res);
}));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
