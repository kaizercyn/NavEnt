const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const dbService = require('./dbservice');
const { request } = require('http');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.get('/', (request, response) => {
  response.render('index');
});

//createEvents
app.post('/insert', (request, response) => {
    cons
})
