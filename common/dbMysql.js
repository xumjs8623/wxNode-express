var dbConfig = require('../config/db.js');
module.exports = function(sqlStr,params) {
  var mysql = require('mysql');
  var connection = mysql.createConnection(dbConfig.mysql);

  connection.connect();

  connection.query(sqlStr, params, function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
  });

  connection.end();
}
