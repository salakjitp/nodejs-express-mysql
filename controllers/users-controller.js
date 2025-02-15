const $dbConfig = require('../configs/db'),
    connection = require('../utils/connection'),
    query = require('../utils/query');
const Users = require('../models/users-model');

const dbConfig = { ...$dbConfig, database: "mydb" }

exports.getUsers = async (req, res) => {
    let sql = `SELECT * FROM users`;
    const conn = await connection(dbConfig).catch(e => console.log(e));
    const data = await query(conn, sql).catch(console.log);

    res.status(200).json({
        status: 200,
        data: data || [],
        message: "List retrieved successfully",
    });
}

exports.postUser = async (req, res) => {
    const _data = new Users(req.body);
    _data.validation()

    if (_data.errors.length) {
        res.status(400).json({
            status: 400,
            message: _data.errors
        })
    }
    else {
        let sql = `INSERT INTO users (firstname, lastname, username) VALUES (?)`;
        let values = [
            _data.firstname,
            _data.lastname,
            _data.username
        ];

        const conn = await connection(dbConfig).catch(e => console.log(e));
        const data = await query(conn, sql, [values])
            .catch(console.log);

        if (data.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: "Added successfully"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: data
            })
        }
    }
};

exports.putUser = async (req, res) => {
    const _data = new Users(req.body);
    _data.validation()
    const userId = req.params.id;

    console.log({ body: req.body, params: req.params })

    if (_data.errors.length) {
        res.status(400).json({
            status: 400,
            message: _data.errors
        })
    }
    else {
        let sql = `UPDATE users SET ? WHERE ?`;
        let values = [{ firstname: _data.firstname, lastname: _data.lastname, username: _data.username }, { userId: userId }];

        const conn = await connection(dbConfig).catch(e => console.log(e));
        const data = await query(conn, sql, values)
            .catch(console.log)

        if (data == undefined) {
            res.status(400).json({
                status: 400,
                message: "Error updated."
            })
        }
        else if (data.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: "updated successfully"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: data
            })
        }
    }
};

exports.delUser = async (req, res) => {
    const _data = new Users(req.body);
    _data.validation()
    const userId = req.params.id;
    if (userId == null || userId == undefined) {
        res.status(400).json({
            status: 400,
            message: _data.errors
        })
    }
    else {
        let sql = `DELETE FROM users WHERE userid = ?`;
        let values = [userId];

        const conn = await connection(dbConfig).catch(e => console.log(e));
        const data = await query(conn, sql, values)
            .catch(console.log);

        if (data.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: "Deleted successfully"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: data
            })
        }
    }
};

// // Get all user
// app.get('/api/users', (req, res) => {
//     db.query('SELECT * FROM users', (err, results) => {
//         if (err) {
//             console.error('Error executing query: ' + err.stack);
//             res.status(500).json({
//                 status: 500,
//                 message: `Error get list user`
//             })
//             return;
//         }
//         res.status(200).json(results);
//     });
// });

// //Create new user
// app.post('/api/users', (req, res) => {
//     const { firstname, lastname, username } = req.body;
//     db.query('INSERT INTO users (firstname, lastname, username) VALUES (?, ?, ?)', [firstname, lastname, username], (err, result) => {
//         if (err) {
//             console.error('Error executing query: ' + err.stack);
//             res.status(400).json({
//                 status: 400,
//                 message: `Error create user`
//             })
//             return;
//         }
//         res.status(201).json({
//             status: 201,
//             message: `User created successfully`
//         })
//     });
// });

// //Update user by userid
// app.put('/api/users/:id', (req, res) => {
//     const { firstname, lastname, username } = req.body;
//     const userId = req.params.id;
//     db.query('UPDATE users SET firstname = ?, lastname = ? , username = ? WHERE userid = ?', [firstname, lastname, username, userId], (err, result) => {

//         if (err) {
//             console.error('Error executing query: ' + err.stack);
//             res.status(400)
//                 .json({
//                     status: 400,
//                     message: `Error update userId ${userId}`
//                 })
//             return;
//         }
//         res.status(200).json({
//             status: 200,
//             message: `UserId ${userId} updated successfully`
//         })
//     });
// });

// //Delete user by userid
// app.delete('/api/users/:id', (req, res) => {
//     const userId = req.params.id;
//     db.query('DELETE FROM users WHERE userid = ?', [userId], (err, result) => {
//         if (err) {
//             console.error('Error executing query: ' + err.stack);
//             res.status(400).json({
//                 status: 400,
//                 message: `Error delete userId ${userId}`
//             })
//             return;
//         }
//         res.status(200).json({
//             status: 200,
//             message: `Delete userId ${userId} successfully`
//         })
//     });
// });