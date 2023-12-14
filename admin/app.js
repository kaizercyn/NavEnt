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

app.get('/edit_event', (request, response) => {
    response.render('edit_event');
});

app.get('/post_announce', (request, response) => {
    response.render('post_announce');
});

app.get('/admin_event', (request, response) => {
    response.render('admin_event');
});

app.get('/admin_profile', (request, response) => {
    response.render('admin_profile');
});

app.get('/create_event', (request, response) => {
    response.render('create_event');
});

app.get('/event_attendance', (request, response) => {
    response.render('event_attendance');
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
        // console.log("app.js: ", results)
        response.json({data: results});
    } catch (error) {
        console.log(err + " Error getting events.");
        response.status(500).json({ error: err.message });
    }
})

app.get('/search/:Event_Name', async (request, response) => {
    try {
        const { Event_Name } = request.params
        console.log({ Event_Name })
        const db = dbService.getDbServiceInstance()
        const results = await db.searchEvent(Event_Name)
        console.log("app.js: ", results)
        response.json({data: results});
    } catch (error) {
        console.log(error + " Error getting searched events");
        response.status(500).json({ error: err.message });
    }
})

app.listen(process.env.PORT, () => console.log('app is running'))
