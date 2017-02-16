var sql = require('../../common/dbMysql.js');
var moment = require('moment');//时间包
// 微信关键词回复模块
module.exports = function (message, req, res) {
  switch (message.MsgType) {
    // 关注和取注公众号
    // { ToUserName: 'gh_471f0c38b32e',
    // FromUserName: 'ogRt9s7uVTAh8CumtbfKLQqpIKaM',
    // CreateTime: '1487209890',
    // MsgType: 'event',
    // Event: 'unsubscribe',/'subscribe'
    // EventKey: '' }
    case 'event':
      if (message.Event == 'subscribe') {

        res.reply({
          title: '欢迎关注清影微信，这里有最新的科技资讯',
          description: '这里是前端工程师的游乐场',
          picurl: 'www.baidu.com'
        });
      }
      break;
    // 文本类型
    // { ToUserName: 'gh_471f0c38b32e',
    // FromUserName: 'ogRt9s7uVTAh8CumtbfKLQqpIKaM',
    // CreateTime: '1487208686',
    // MsgType: 'text',
    // Content: 'hehe',
    // MsgId: '6387512669246748009' }
    case 'text':
      switch (message.Content) {
        case 'h':
          // sql('INSERT INTO user(openid,creat_time) VALUES(?,?)', [message.FromUserName, moment().format("YYYY-MM-DD HH:mm:ss")]);
          sql('SELECT * FROM user');
          res.reply({
            content: '成功',
            type: 'text'
          });
          break;
      }
      break;
    // 发送位置
    // { ToUserName: 'gh_471f0c38b32e',
    // FromUserName: 'ogRt9s7uVTAh8CumtbfKLQqpIKaM',
    // CreateTime: '1487208711',
    // MsgType: 'location',
    // Location_X: '29.980747',
    // Location_Y: '120.616739',
    // Scale: '15',
    // Label: '绍兴市越城区舜江路口公交站东南(门前江公寓西南)',
    // MsgId: '6387512776620930428' }
    case 'location':
      break;
    // 发送音频(需要根据mediaid 去微信服务器获取资源，然后上传到存储服务器或自己本地)
    //{ ToUserName: 'gh_471f0c38b32e',
    // FromUserName: 'ogRt9s7uVTAh8CumtbfKLQqpIKaM',
    // CreateTime: '1487210222',
    // MsgType: 'voice',
    // MediaId: 'FGZ1ZHUAN9JYu32GQ-sEASI-fMWb7SI78ElX5jGQaR1ERlN_QEgYJ8d7k4ks1kIv',
    // Format: 'amr',
    // MsgId: '6387519266316515292',
    // Recognition: '' }
    case 'voice':
      break;
    // 发送图片(需要根据mediaid 去微信服务器获取资源，然后上传到存储服务器或自己本地)
    //     { ToUserName: 'gh_471f0c38b32e',
    // FromUserName: 'ogRt9s7uVTAh8CumtbfKLQqpIKaM',
    // CreateTime: '1487210279',
    // MsgType: 'image',
    // PicUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/1Rtjcu21hfypf4HQaVjd3SiacicoeaQTf6bWPdOsibs9VZiaesxiaLFeSbIMUMziajOF1P7iceDbAvbEEFJXZnsErD9Lg/0',
    // MsgId: '6387519511129651175',
    // MediaId: 'jdEG9VI5rUQNE4JDWPTTiISZl4yJmOWhqJ4Pfpf2EaEMH25sf4-GlUoxKseMfhYd' }
    case 'image':
      break;
  }
}
