var dbConfig = require('../config/db.js');
module.exports = function(sqlStr, params) {
  var mysql = require('mysql');
  var connection = mysql.createConnection(dbConfig.mysql);

  connection.connect();
  if (params == '') {
    var query = connection.query(sqlStr, function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      // var data=[];
      // for(var i=0;i<rows.lenght;i++){
      //   data.push(rows[i].RowDataPacket);
      // }
      // console.log(data);
    });
  } else {
    var query = connection.query(sqlStr, params, function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      // var data=[];
      // for(var i=0;i<rows.lenght;i++){
      //   data.push(rows[i].RowDataPacket);
      // }
      // console.log(data);
    });
  }



  console.log(query.sql);
  connection.end();

};
