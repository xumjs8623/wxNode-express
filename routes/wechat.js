var express = require('express');
var router = express.Router();
const config = require('../config/wechat.js');
// var wechat = require('wechat');

router.get('/', function(req, res, next) {
	res.send('111');
});
module.exports = router;
