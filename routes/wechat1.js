var wechat = require('wechat');

app.use(connect.query()); // Or app.use(express.query());
app.use('/wechat', wechat('some token', function (req, res, next) {
  // message is located in req.weixin
  var message = req.weixin;
  if (message.FromUserName === 'diaosi') {
    // reply with text
    res.reply('hehe');
  } else if (message.FromUserName === 'text') {
    // another way to reply with text
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'hehe') {
    // reply with music
    res.reply({
      type: "music",
      content: {
        title: "Just some music",
        description: "I have nothing to lose",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3"
      }
    });
  } else {
    // reply with thumbnails posts
    res.reply([
      {
        title: 'Come to fetch me',
        description: 'or you want to play in another way ?',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }
}));