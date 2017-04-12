// 引入版本为 "jsonwebtoken": "^7.3.0",后调用,
var jwt = require('jsonwebtoken');
var resTpl = require('./resTpl');
// 令牌发放功能参数配置
const authorConfig = {
  sign: 'xuminjun',//生成签名私钥
  validDate: '1d' //有效期  
}
// 设置token
// data为密钥中传递的参数
exports.setToken = (req, res, next, data) => {
  const mytoken = jwt.sign(data, authorConfig.sign, { expiresIn: authorConfig.validDate });
  // 设置返回的cookie
  return res.cookie('token', mytoken);
};
// 验证并刷新token,并将token中的值放入req.user
exports.refreshToken = (req, res, next) => {
  // 判断cookie中是否存在token
  if (req.cookies.hasOwnProperty('token')) {
    // 存在则判断是否有效
    const mytoken = req.cookies.token;
    jwt.verify(mytoken, authorConfig.sign, function (err, decoded) {
      if (err) {
        // 解码token出错，意味着token过期或者没有生成过，返回false
        resTpl(res, 'unauthor', '身份认证失败');
      } else {
        // 验证成功后再次设置token
        delete decoded.exp;
        delete decoded.iat;
        // 将token的参数放入req.user
        req['user'] = decoded;
        // 取出原有值后重新设置token
        const mytoken = jwt.sign(decoded, authorConfig.sign, { expiresIn: authorConfig.validDate });
        next();
      }
    });
  } else {
    // 不存在则直接返回
    resTpl(res, 'unauthor', '身份认证失败');
  }
};
// 只验证token
exports.verifyToken = (req, res, next) => {
  // 判断cookie中是否存在token
  if (req.cookies.hasOwnProperty('token')) {
    // 存在则判断是否有效
    const mytoken = req.cookies.token;
    jwt.verify(mytoken, authorConfig.sign, function (err, decoded) {
      if (err) {
        // 解码token出错，意味着token过期或者没有生成过，返回false
        resTpl(res, 'unauthor', '身份认证失败');
      } else {
        next();
      }
    });
  } else {
    // 不存在则直接返回
    resTpl(res, 'unauthor', '身份认证失败');
  }

};
// 销毁token
exports.destoryToken = (req, res, next) => {

}