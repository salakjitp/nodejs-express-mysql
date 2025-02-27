var express = require('express')
var cors = require('cors')
// const mysql = require('mysql2');
const $dbConfig = require('./configs/db');
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize($dbConfig.database, $dbConfig.user, $dbConfig.password, {
    dialect: 'mysql',
    host: 'localhost'
});


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());


const Users = sequelize.define('users2', {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


sequelize
    .sync()
    .then(res => {
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server started, listening port: ${PORT}`);
        });
    }).catch(err => {
        console.log(err)
    });


// Get all user
app.get('/users/list', (req, res) => {
    Users.findAll().then((result) => {
        console.log(result)

        res.status(200).json({
            status: 200,
            data: result || [],
            message: "List retrieved successfully",
        });
    }).catch((err) => {
        res.status(400).json({
            status: 400,
            message: err
        });
    });
});

app.get('/users/dataById', (req, res) => {
    const userId = req.query.id;

    Users.findByPk(userId).then((result) => {
        res.status(200).json({
            status: 200,
            data: result || null,
            message: "Success"
        });
    }).catch((err) => {
        res.status(400).json({
            status: 400,
            message: err
        });
    });
});


app.post('/users/add', (req, res) => {

    const _data = req.body;

    Users.create({
        ..._data
    }).then((result) => {
        console.log(result[0])

        res.status(200).json({
            status: 200,
            message: "Success"
        });
    }).catch((err) => {

        res.status(400).json({
            status: 400,
            message: err
        });
    });
});




