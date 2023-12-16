const express = require('express');
const app = express();
const session = require('express-session')
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const dbService = require('./dbservice');
const { request } = require('http');


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true}))

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.use('/font', express.static(path.join(__dirname, 'public/css/font')));

app.use('/res', express.static(path.join(__dirname, 'public/css/res')));

app.set('views', path.join(__dirname, 'views'));


const sessionAuth = (request, response, next) => {
    if (request.session.username) {
        next()
    } else {
        response.redirect('/')
    }
}
app.get('/', (request, response) => {
    if (request.session.username) {
        console.log("IF app get /: ", request.session)
        response.redirect('/admin_home');
      } else {
        console.log("ELSE app get /: ", request.session)
        response.render('admin_login');
      }
});

app.get('/admin_home', sessionAuth, (request, response) => {
    response.render('admin_home');
});

app.get('/edit_event', sessionAuth,  (request, response) => {
    response.render('edit_event');
});

app.get('/post_announce', sessionAuth, (request, response) => {
    response.render('post_announce');
});

app.get('/admin_event', sessionAuth, (request, response) => {
    response.render('admin_event');
});

app.get('/admin_profile', sessionAuth, (request, response) => {
    response.render('admin_profile');
});

app.get('/create_event', sessionAuth, (request, response) => {
    response.render('create_event');
});

app.get('/event_attendance', sessionAuth, (request, response) => {
    response.render('event_attendance');
});

app.get('/admin_home.js', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/scripts/admin_home.js'), {
      headers: {
        'Content-Type': 'application/javascript'
        }
    });
});

app.get('/admin_login.js', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/scripts/admin_login.js'), {
      headers: {
        'Content-Type': 'application/javascript'
        }
    });
});

app.get('/admin_login.css', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/css/admin_login.css'), {
        headers: {
            'Content-Type': 'text/css'
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
        response.json({data: results});
    } catch (error) {
        console.log(error + " Error getting searched events");
        response.status(500).json({ error: err.message });
    }
})

app.post('/login', async (request, response) => {
    try {
        let username = request.body.username
        let password = request.body.password

        if (username && password) {
            console.log({ username, password })
            const db = dbService.getDbServiceInstance()
            const results = await db.verifyUser(username, password)
            console.log("app.js:", results)

            if (results.length > 0) {
                request.session.username = username;
                response.redirect('/admin_home')
            } else {
                console.log("Login credentials invalid")
                response.redirect('/')
            }
        }
    } catch (error) {
        console.log(error + " Error verifying user credentials");
        response.status(500).json({ error: error.message }); 
    }

    console.log(request.session)
})

app.get('/logout', (request, response) => {
    console.log("logging out...")
    request.session.destroy()
    console.log(request.session)
    response.redirect('/')
})

app.listen(process.env.PORT, () => console.log('app is running'))
