const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password', 
    database:'webdev'
});

const app = express();
app.use(express.static('public'));
app.set('views',`${__dirname}/views`);
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret: 'somesecretkey', resave: true, saveUninitialized: true}));

app.listen(8001, 'localhost');
console.log("NodeJS Server is running at port 8001");
