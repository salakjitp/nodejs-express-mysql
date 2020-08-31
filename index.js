const express = require('express'),
  path = require('path') // add path module,
  app = express(),
  cors = require('cors'),
  // mysql = require('mysql'),
  bodyParser = require('body-parser');
  // dbConfig = require('./configs/db'),
  // connection = require('./helpers/connection');

// setup database
//const _connection = connection(dbConfig).catch(e => {});
//db = connection(dbConfig).catch(e => {});

// const _connection  = mysql.createConnection({
//   host: dbConfig.host,
//   port: 3306,
//   user: dbConfig.user,
//   password: dbConfig.password,
//   database: dbConfig.database  
// })

// // connect to database
// _connection.connect((err) => {
//   if (err) {
//       console.log('Not connected to database');
//       return;
//   } else {
//       console.log('Connected to database');
//   }
// });

// // make connection global
// global.db = _connection;

// db = mysql.createConnection({
//   host: dbConfig.host,
//   user: dbConfig.user,
//   password: dbConfig.password,
//   database: dbConfig.database  
// })


// make server object that contain port property and the value for our server.
var server = {
  port: 4040
};

// routers
const usersRouter = require('./routes/users');

// use the modules
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended: true})) // parsing incoming requests with urlencoded based body-parser

// use router
app.use('/users', usersRouter);

// router user input
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname,'views') + '/index.html');
});

app.get('/input', function(req, res) {
  res.sendFile(path.resolve(__dirname,'views') + '/input.html');
});

// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));