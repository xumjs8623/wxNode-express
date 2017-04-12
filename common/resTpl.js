module.exports = (res,stat, msg, data) => {
  // 设置返回数据模板
  var returnData = {
    code: 1,
    msg: msg,
    data: []
  };
  // 如果不传入入数据，那么设置data为[]
  if (data = '') {
    returnData['data'] = [];
  }else{
    returnData['data'] = data;
  }
  // 根据状态标签来设置返回模板
  switch (stat) {
    // 成功返回
    case 'success':
      returnData['code'] = 1;
      break;
      // 错误返回
    case 'error':
      returnData['code'] = 0;
      break;
      // 身份认证失败
    case 'unauthor':
      returnData['code'] = -1;
      break;
  }
  res.json(returnData);
}