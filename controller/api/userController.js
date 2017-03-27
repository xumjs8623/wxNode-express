// sql 封装
var sql = require('../../common/dbMysql');
// 加密模块
var crypto = require( 'crypto' );		//引入  crypto 模块
var md5 = function(data) { 	//定义加密函数
    return crypto.createHash('md5').update(data).digest('hex').toLowerCase();
} 
// 登录模块
exports.loginUser = function (req, res, next) {
    console.log(req);
    var data = {};
    if (req.body.username == 'admin@hzyy' && req.body.password == '123456') {
        data['code'] = 1;
        data['msg'] = '登录成功'
    } else {
        data['code'] = 0;
        data['msg'] = '登录失败'
    }
    res.json(data);
};
// 重置账户密码
exports.reset = function (req, res, next) {
    var password = md5('admin');
    sql("INSERT INTO user (name, username, password) VALUES ('mj', 'admin', '" + password + "')", function (data) {
        res.json(data);
    });
}