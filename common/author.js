// 引入版本为 "express-jwt": "^5.1.0"后调用,
var jwt = require('jsonwebtoken');

// 设置token
// data为密钥中传递的参数
exports.setToken = (req, res, next, data) => {
  const mytoken = jwt.sign(data, 'xuminjun', { expiresIn: '1d' });
  // 设置返回的cookie
  res.cookie('token', mytoken);
};
// 获取token
exports.getToken = (req, res, next) => {
  const mytoken = req.headers.token;
  const decoded = jwt.verify(mytoken, 'xuminjun');
};
// 刷新token
exports.refreToken = (req, res, next) => {
  const mytoken = req.headers.token;
  const decoded = jwt.verify(mytoken, 'xuminjun');
  if(decoded){
    // 取出原有值后重新设置token
  }else{
    // 解码token出错，意味着token过期或者没有生成过，返回false
    return false;
  }
};
// 验证token
exports.verifyToken = (req,res,next) => {
  const mytoken = req.headers.token;
  const decoded = jwt.verify(mytoken, 'xuminjun');
};
// 销毁token
exports.destoryToken = (req,res,next) => {

}