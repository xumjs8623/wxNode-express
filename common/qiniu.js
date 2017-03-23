var qiniu = require("qiniu");
var uploadQN = (fileName, filePath, callback) => {
    //需要填写你的 Access Key 和 Secret Key
    qiniu.conf.ACCESS_KEY = '4nus9zgxi-N2uhbrU-S8CuiIQlLTF9DL_DX0NQQM';
    qiniu.conf.SECRET_KEY = 'WT8Bpb_6PqMzAFEe8soNnU2RqEL9yvykAN_3HflD';
    // 外网访问的域名
    var url = 'http://qn.xuminjun.com/';
    //要上传的空间
    var bucket = 'mj-space';
    //上传到七牛后保存的文件名
    var key = fileName;
    //构建上传策略函数
    function uptoken(bucket, key) {
        var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
        return putPolicy.token();
    }
    //生成上传 Token
    var token = uptoken(bucket, key);
    //要上传文件的本地路径
    var filePath = filePath;
    //构造上传函数
    function uploadFile(uptoken, key, localFile) {
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
            if (!err) {
                // 上传成功， 处理返回值
                // ret.key为七牛存储文件名
                console.log(ret.hash, ret.key, ret.persistentId);
                // 传入回调的文件名和七牛外网访问的域名组合 传入回调
                callback(url+ret.key);
            } else {
                // 上传失败， 处理返回代码
                console.log(err);
            }
        });
    }
    //调用uploadFile上传
    uploadFile(token, key, filePath);
};
module.exports = uploadQN;