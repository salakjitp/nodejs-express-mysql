var express = require('express')
var cors = require('cors')
// const mysql = require('mysql2');
// const dbConfig = require('./configs/db');
const sequelize = require('./utils/connection')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

// routers
// const catbreedRoute = require('./routes/catbreed');
const usersRoute = require('./routes/users');

// use router
// app.use('/catbreed', catbreedRoute);
app.use('/users', usersRoute);


// // MySQL Connection
// const db = mysql.createConnection({
//     host: dbConfig.host,
//     user: dbConfig.user,
//     password: dbConfig.password,
//     database: dbConfig.database
// });

// // Connect to MySQL
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL: ' + err.stack);
//         return;
//     }
//     console.log('Connected to database');
// });

sequelize
    .sync()
    .then(res => {
        // console.log(res);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server started, listening port: ${PORT}`);
        });
    }).catch(err => {
        console.log(err)
    });
