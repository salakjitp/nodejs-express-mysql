const dbConfig = require('../configs/db'),
connection = require('../helpers/connection'),
query = require('../helpers/query') ;
const Users = require('../models/users-model');

exports.getUsers = async (req , res) => {

    let sql = `SELECT * FROM users`;
    const conn = await connection(dbConfig).catch(e => console.log(e));
    const data = await query(conn, sql).catch(console.log);

    res.status(200).json({
        status: 200,
        data: data || [],
        message: "User lists retrieved successfully",
    });
}

exports.postUsers = async (req , res) => {
    const _users = new Users(req.body);
    _users.validation()

    if(_users.errors.length){
        res.status(400).json({
            status : 400,
            message : _users.errors
        })
    }
    else{
        let sql = `INSERT INTO users(firstname, lastname, nickname) VALUES (?)`;
        let values = [
            _users.firstname,
            _users.lastname,
            _users.nickname
        ];

        const conn = await connection(dbConfig).catch(e => console.log(e));
        const data = await query(conn, sql, [values])
        .catch(console.log);

        if(data.affectedRows > 0){
            res.status(200).json({
                status: 200,
                message: "New user added successfully"
            })
        }else{
            res.status(200).json({
                status: 200,
                message: data
            })
        }
    }
};