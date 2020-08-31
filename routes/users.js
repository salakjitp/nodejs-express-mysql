// "use strict";
const express = require('express'),
  router = express.Router();
  // dbConfig = require('../configs/db'),
  // connection = require('../helpers/connection'),
  // query = require('../helpers/query');

const users_controller = require('../controllers/users-controller');

//GET
router.get('/list', users_controller.getUsers);

// get user lists
// router.get('/list', async (req, res) => {
//   let sql = `SELECT * FROM users`;
//   const conn = await connection(dbConfig).catch(e => {}) 
//   const data = await query(conn, sql).catch(console.log);

//   res.json({
//     status: 200,
//     data,
//     message: "User lists retrieved successfully",
//   });

//   // db.query(sql, function(err, data, fields) {
//   //   if (err) throw err;
//   //   res.json({
//   //     status: 200,
//   //     data,
//   //     message: "User lists retrieved successfully"
//   //   })
//   // })
// });

// create new user
router.post('/new', users_controller.postUsers);

// router.post('/new', function(req, res) {
//   let sql = `INSERT INTO users(name, gender) VALUES (?)`;
//   let values = [
//     req.body.firstname,
//     req.body.lastname,
//     req.body.nickname
//   ];
//   db.query(sql, [values], function(err, data, fields) {
//     if (err) throw err;
//     res.json({
//       status: 200,
//       message: "New user added successfully"
//     })
//   })
// });

module.exports = router;