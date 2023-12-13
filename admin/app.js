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
  response.render('admin_home');
});


app.get('/admin_home.js', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/scripts/admin_home.js'), {
      headers: {
        'Content-Type': 'application/javascript'
        }
    });
});

app.get('/admin_home.css', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/css/admin_home.css'), {
        headers: {
            'Content-Type': 'text/css'
        }
    });
});


app.get('/getEvents', async (request, response) => {
    try {
        const db = dbService.getDbServiceInstance()
        const results = await db.getEvents()
        console.log("app.js: ", results)
        response.json({data: results});
    } catch (error) {
        console.log(err + " Error getting events.");
        response.status(500).json({ error: err.message });
    }
})

app.listen(process.env.PORT, () => console.log('app is running'))
