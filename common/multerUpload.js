// 引入上传文件模块
var multer = require('multer');
// 引入七牛云存储封装模块
var qiniu = require('./qiniu.js');
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
//添加配置文件到muler对象。
var uploadParam = multer({
    storage: storage
});

//如需其他设置，请参考multer的limits,使用方法如下。
//var muilter = multer({
//    storage: storage,
//    limits:{}
// });

//multer有single()中的名称必须是表单上传字段的name名称。
var upload = uploadParam.single('file');
var dataInput = function (req, res) {
    upload(req, res, function (err) {
        //添加错误处理
        if (err) {
            // res.json()
            return console.log(err);
        }
        //文件信息在req.file或者req.files中显示。
        qiniu(req.file.filename, req.file.path, function(filePath){
             res.json({url: filePath});
        });
       
    });
}
//导出对象
module.exports = dataInput;