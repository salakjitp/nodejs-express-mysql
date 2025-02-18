var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
const dbConfig = require('./configs/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started, listening port: ${PORT}`);
});

// Get all user
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({
                status: 500,
                message: `Error get list user`
            })
            return;
        }
        res.status(200).json(results);
    });
});

//Create new user
app.post('/api/users', (req, res) => {
    const { firstname, lastname, username } = req.body;
    db.query('INSERT INTO users (firstname, lastname, username) VALUES (?, ?, ?)', [firstname, lastname, username], (err, result) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(400).json({
                status: 400,
                message: `Error create user`
            })
            return;
        }
        res.status(201).json({
            status: 201,
            message: `User created successfully`
        })
    });
});

//Update user by userid
app.put('/api/users/:id', (req, res) => {
    const { firstname, lastname, username } = req.body;
    const userId = req.params.id;
    db.query('UPDATE users SET firstname = ?, lastname = ? , username = ? WHERE userid = ?', [firstname, lastname, username, userId], (err, result) => {

        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(400)
                .json({
                    status: 400,
                    message: `Error update userId ${userId}`
                })
            return;
        }
        res.status(200).json({
            status: 200,
            message: `UserId ${userId} updated successfully`
        })
    });
});

//Delete user by userid
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE userid = ?', [userId], (err, result) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(400).json({
                status: 400,
                message: `Error delete userId ${userId}`
            })
            return;
        }
        res.status(200).json({
            status: 200,
            message: `Delete userId ${userId} successfully`
        })
    });
});