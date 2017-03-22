// mysql配置信息
var sqlconfig = {
  host: '23.106.159.123',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'wx_qingyingwangluo'
};
// 引入mysql包
var mysql = require('mysql');
// 传入sql语句和回调函数
module.exports = function (sqlStr, callback) {
  // 创建数据库连接，并把数据库参数传入
  var connection = mysql.createConnection(sqlconfig);
  // 连接数据库
  connection.connect();
  // 执行sql语句
  var query = connection.query(sqlStr, function (err, rows, fields) {
    // 如果有报错那就抛出异常
    if (err) throw err;
    // 没有报错那就执行回调函数，并把得到的数据传入回调函数 
    callback(rows);
  });
  // 关闭数据库连接
  connection.end();
};
