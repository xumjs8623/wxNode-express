var dbConfig = require('../config/db.js');
module.exports = function (sqlStr, params) {
  var mysql = require('mysql');
  var connection = mysql.createConnection(dbConfig.mysql);

  connection.connect();
  if (params = '') {
    var query = connection.query(sqlStr, function (err, rows, fields) {
      if (err) throw err;
      console.log('err');
      console.log(err);
      console.log('rows');
      console.log(rows);
      console.log('fields');
      console.log(fields);
      // console.log('The solution is: ', rows[0].solution);
    });
  } else {
    var query = connection.query(sqlStr, params, function (err, rows, fields) {
      if (err) throw err;
      console.log('err');
      console.log(err);
      console.log('rows');
      console.log(rows);
      console.log('fields');
      console.log(fields);
      // console.log('The solution is: ', rows[0].solution);
    });
  }

  console.log(query.sql)
  connection.end();
}
