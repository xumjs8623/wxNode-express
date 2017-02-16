var request = require('request');
module.exports = function(handle) {
  request('https://cnodejs.org/api/v1/topics', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body)
        //处理。。。。。
      handle.json(body);
    }
  })

}
