const mysql = require('mysql');

module.exports = async (params) => new Promise(
(resolve, reject) => {
  const connection = mysql.createConnection(params);
  connection.connect(error => {
	  if (error) {
      console.log('Not connected to database');
      reject(error);
      return;
    }
    else {
      console.log('Connected to database');
    }
    resolve(connection);
  })

});