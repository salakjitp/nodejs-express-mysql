const Sequelize = require('sequelize');
const $dbConfig = require('../configs/db')

const sequelize = new Sequelize($dbConfig.database, $dbConfig.user, $dbConfig.password, {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

// const mysql = require('mysql2');

// module.exports = async (params) => new Promise(
//     (resolve, reject) => {
//         const connection = mysql.createConnection(params);
//         connection.connect(error => {
//             if (error) {
//                 console.log('Not connected to database');
//                 reject(error);
//                 return;
//             }
//             else {
//                 console.log('Connected to database');
//             }
//             resolve(connection);
//         })

//     });