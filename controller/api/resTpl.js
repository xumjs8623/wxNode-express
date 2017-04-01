module.exports = (stat, msg, data) => {
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
    case 'success':
      returnData['code'] = 1;
      break;
    case 'error':
      returnData['code'] = 0;
      break;
  }
  return returnData;
}