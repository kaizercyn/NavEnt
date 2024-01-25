const mysql = require('mysql');
const dotenv = require('dotenv');
const { resolve } = require('path');
const { rejects } = require('assert');
const { response } = require('express');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: '',
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        return;
    }
    console.log('Connected to the database');
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getEvents() {
        let response;
        try {
            response = await new Promise ((resolve, reject) => {
                const query = "SELECT * FROM webdev.events"
                connection.query(query, (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        // console.log("Fetched data from DB:", results);
                        resolve(results)
                    }
                })
            }) 
            // console.log(response)
            return response
        } catch (error) {
            console.log(error + ' Fetching events from DB failed.')
        }
    }

    async searchEvent(Event) {
        let response;
        try {
            response = await new Promise ((resolve, reject) => {
                if (/^\d+$/.test(Event)){
                    console.log("received id")
                    const parsed = parseInt(Event, 10)
                    console.log("Parsed:", parsed)
                    const query = "SELECT * FROM webdev.events WHERE Event_ID = ?"
                    connection.query(query, [parsed], (err, results) => {
                        if (err) {
                            reject(new Error(err.message))
                        } else {
                            console.log("Res:", results)
                            resolve(results)
                        }
                    })
                } else {
                    console.log("RECEIVED NAME")
                    const query = "SELECT * FROM webdev.events WHERE Event_Name LIKE ?"
                    connection.query(query, [`%${Event}%`], (err, results) => {
                        if (err) {
                            reject(new Error(err.message))
                        } else {
                            resolve(results)
                        }
                    })
                }
            }) 
            console.log("Response: ", response)
            return response
        } catch (error) {
            console.log(error + ' Fetching events from DB failed.')
        }
    }

    async getAttn(a, b) {
        let response;
        try {
            response = await new Promise ((resolve, reject) => {
                const parsed = parseInt(a, 10)
                console.log("Parsed:", parsed)
                let query = ""
                switch (b) {
                    case 'onetime':
                        query = "SELECT * FROM webdev.onetime WHERE Event_ID = ?"
                        break;
                    case 'ampm':
                        query = "SELECT * FROM webdev.`am/pm` WHERE Event_ID = ?"
                        break;
                    case 'series':
                        query = "SELECT * FROM webdev.series WHERE Event_ID = ?"
                        break;
                    default:
                        break;
                }
                connection.query(query, [parsed], (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        console.log("Res:", results)
                        resolve(results)
                    }
                })
            }) 
            console.log("Response: ", response)
            return response
        } catch (error) {
            console.log(error + ' Fetching events from DB failed.')
        }
    }

    async getExternal(a) {
        let response;
        try {
            response = await new Promise ((resolve, reject) => {
                const query = "SELECT * FROM webdev.eventlinks WHERE Event_ID = ?"
                connection.query(query, [a], (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        console.log("Fetched data from DB (EL):", results);
                        resolve(results)
                    }
                })
            }) 
            // console.log(response)
            return response
        } catch (error) {
            console.log(error + ' Fetching event links from DB failed.')
        }
    }

    async verifyUser(username, password) {
        let response;
        try {
            const query = "SELECT * FROM webdev.admin WHERE Admin_ID = ? AND Password = ?"
            const results = await new Promise((resolve, reject) => {
                connection.query(query, [username, password], (err, results) => {
                    if (err) {
                        reject(new Error (err.message))
                    } else {
                        // console.log("Fethed data from DB: ", results)
                        resolve(results)
                    }
                })
            })
            console.log("Response: ", results)
            return results
        } catch (error) {
            console.log(error + ' Verification of admin credentials failed.')
        }
    }

    async lastEventID() {
        let response;
        try {
            response = await new Promise ((resolve, reject) => {
                const query = "SELECT Event_ID FROM webdev.events ORDER BY Event_ID DESC LIMIT 1"
                connection.query(query, (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        resolve(results)
                    }
                })
            }) 
            console.log("Response: ", response)
            return response
        } catch (error) {
            console.log(error + ' Fetching events from DB failed.')
        }
    }

    async newEvent(a, b, c, d, e, f, g, h, i, j){
        let response
        try {
            const lastID = await this.lastEventID();
            let eventID = `${lastID[0].Event_ID + 1}`
            console.log("event id: ", eventID)
            response = await new Promise ((resolve, reject) => {
                const query = "INSERT INTO webdev.events (Event_ID, Event_Name, Event_Tagline, Event_Description, Event_StartDate, Event_EndDate, Event_Type, isOpen, isPublic, isLive, Evaluation_Link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                connection.query(query, [eventID, a, b, c, d, e, f, g, h, i, j],(err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        // console.log("Fetched data from DB:", results);
                        resolve(results.Event_ID)
                    }
                })
            }) 
            // console.log(response)
            return response
        } catch (error) {
            console.log(error + ' Creating new event failed.')
    
        }
    }

    async editEvent(a, b, c, d, e, f, g, h, i, j, k, l){
        let response
        if (l == true) {
            let query
            switch (g.toLowerCase()) {
                case "onetime":
                    query = "DELETE FROM webdev.onetime WHERE Event_ID = ?"
                    break;
                case "am/pm":
                    query = "DELETE FROM webdev.`am/pm` WHERE Event_ID = ?"
                    break;
                case "series":
                    query = "DELETE FROM webdev.series WHERE Event_ID = ?"
                    break;
                default:
                    break;
            }
            connection.query(query, a,(err, results) => {
                if (err) {
                    console.error('Error executing DELETE query:', err);
                } else {
                    console.log('DELETE operation successful. Rows affected:', results.affectedRows);
                }
            })
        }
        try {
            response = await new Promise ((resolve, reject) => {
                const query = `UPDATE webdev.events
                SET Event_Name = ?,
                Event_Tagline = ?,
                Event_Description = ?,
                Event_StartDate = ?,
                Event_EndDate = ?,
                Event_Type = ?,
                isOpen = ?,
                isPublic = ?,
                isLive = ?,
                Evaluation_Link = ?
                WHERE Event_ID = ?`
                connection.query(query, [b, c, d, e, f, g, h, i, j, k, a],(err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        resolve({
                            affectedRows: results.affectedRows,
                            updateSuccess: true
                          })
                    }
                })
            }) 
            // console.log(response)
            return response
        } catch (error) {
            console.log(error + ' Creating new event failed.')
    
        }
    }

    async oneTime(a, b, c){
        let response
        try {
            const lastID = await this.lastEventID();
            let eventID = `${lastID[0].Event_ID}`
            console.log("event id: ", eventID)
            response = await new Promise ((resolve, reject) => {
                const query = `INSERT INTO webdev.onetime (Event_ID, Start_Time, End_Time, Venue) VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                Start_Time = VALUES(Start_Time),
                End_Time = VALUES(End_Time),
                Venue = VALUES(Venue)`
                connection.query(query, [eventID, a, b, c],(err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        // console.log("Fetched data from DB:", results);
                        resolve(results.Event_ID)
                    }
                })
            }) 
            // console.log(response)
            return response
        } catch (error) {
            console.log(error + ' Creating new event in OneTime failed.')
    
        }
    }
    
    async amPM(a, b, c, d, e, f){
        let response
        try {
            const lastID = await this.lastEventID();
            let eventID = `${lastID[0].Event_ID}`
            console.log("event id: ", eventID)
            response = await new Promise ((resolve, reject) => {
                const query = "INSERT INTO webdev.`am/pm` (Event_ID, AM_Start, AM_End, AM_Venue, PM_Start, PM_End, PM_Venue) VALUES (?, ?, ?, ?, ?, ?, ?) " +
                "ON DUPLICATE KEY UPDATE AM_Start = VALUES(AM_Start), AM_End = VALUES(AM_End), AM_Venue = VALUES(AM_Venue), " +
                "PM_Start = VALUES(PM_Start), PM_End = VALUES(PM_End), PM_Venue = VALUES(PM_Venue)";
                connection.query(query, [eventID, a, b, c, d, e, f],(err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        // console.log("Fetched data from DB:", results);
                        resolve(results.Event_ID)
                    }
                })
            }) 
            // console.log(response)
            return response
        } catch (error) {
            console.log(error + ' Creating new event in AM/PM failed.')
    
        }
    }

    async series(a, b, c, d, e, f){
        let response
        try {
            const lastID = await this.lastEventID();
            let eventID = `${lastID[0].Event_ID}`
            console.log("event id: ", eventID)
            response = await new Promise ((resolve, reject) => {
                const query = `INSERT INTO webdev.series (Event_ID, Series_Num, Series_Name, Date, Start_Time, End_Time, Venue) 
                VALUES (?, ?, ?, ?, ?, ?, ?) 
                ON DUPLICATE KEY UPDATE 
                Series_Name = VALUES(Series_Name),
                Date = VALUES(Date), 
                Start_Time = VALUES(Start_Time), 
                End_Time = VALUES(End_Time), 
                Venue = VALUES(Venue)`
                connection.query(query, [eventID, a, b, c, d, e, f],(err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        // console.log("Fetched data from DB:", results);
                        resolve(results.Event_ID)
                    }
                })
            }) 
            // console.log(response)
            return response
        } catch (error) {
            console.log(error + ' Creating new event in Series failed.')
    
        }
    }

    async imgUpload(a, b){
        let response
        try {
            const lastID = await this.lastEventID();
            let eventID = `${lastID[0].Event_ID}`
            console.log("event id: ", eventID)
            response = await new Promise ((resolve, reject) => {
                const query = "UPDATE webdev.events SET Event_Pic = ?, Event_PicFilePath = ? WHERE Event_Id = ?"
                connection.query(query, [a, b, eventID],(err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        // console.log("Fetched data from DB:", results);
                        resolve(results.Event_ID)
                    }
                })
            }) 
            // console.log(response)
            return response
        } catch (error) {
            console.log(error + ' Adding image data failed.')
    
        }
    }

    async external(a, b){
        let response
        try {
            const lastID = await this.lastEventID();
            let eventID = `${parseInt(lastID[0].Event_ID, 10) + 1}`;
            console.log("event id: ", eventID)
            response = await new Promise ((resolve, reject) => {
                const query = `INSERT INTO webdev.eventLinks (Link_Name, Weblink, Event_ID) VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                Link_Name = VALUES(Link_Name)
                Weblink = VALUES(Weblink)
                Event_ID = VALUES(Event_ID)`
                connection.query(query, [a, b, eventID],(err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        // console.log("Fetched data from DB:", results);
                        resolve(results.Event_ID)
                    }
                })
            }) 
            // console.log(response)
            return response
        } catch (error) {
            console.log(error + ' Creating new external link/s failed.')
    
        }
    }

    async announce(a, b, c){
        let response
        try {
            response = await new Promise ((resolve, reject) => {
                const query = "INSERT INTO webdev.announcements (Date_Posted, Details, Event_ID) VALUES (?, ?, ?)"
                connection.query(query , [a, b, c], (err, results) => {
                    if (err) {
                        reject(new Error (err.message))
                    } else {
                        resolve(results.Event_ID)
                    }
                })
            })
            return response
        } catch (error) {
            console.log(error + ' Creating a new announcement failed.')
        }
    }

    async getRegistrants(a){
        
        let response;
        try {
            response = await new Promise ((resolve, reject) => {
                const query = "SELECT regisdetails.User_ID, registration.Name FROM regisdetails JOIN registration ON regisdetails.User_ID = registration.User_ID WHERE regisdetails.Event_ID = ?;"
                connection.query(query, [a], (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        console.log("Fetched data from DB (EL):", results);
                        resolve(results)
                    }
                })
            }) 
            makeRecord(a, response)
            return response
        } catch (error) {
            console.log(error + ' Fetching registrants from DB failed.')
        }
    }

    async getRegistrantsAMPM(a){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT regisdetails.User_ID, registration.Name FROM regisdetails JOIN registration ON regisdetails.User_ID = registration.User_ID WHERE regisdetails.Event_ID = ?;"
                connection.query(query, [a], (err, results) => {
                    if (err) {
                        reject(new Error(err.message));
                    } else {
                        console.log("Fetched data from DB (Registrants):", results);
                        resolve(results);
                    }
                });
            });
    
            console.log("NameS:", response);
            makeSeriesRecord(a, response, 2);
            return response;
        } catch (error) {
            console.log(error + ' Fetching registrants from DB failed.');
        }
    }

    async getRegistrantsSeries(a){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT regisdetails.User_ID, registration.Name FROM regisdetails JOIN registration ON regisdetails.User_ID = registration.User_ID WHERE regisdetails.Event_ID = ?;"
                connection.query(query, [a], (err, results) => {
                    if (err) {
                        reject(new Error(err.message));
                    } else {
                        console.log("Fetched data from DB (Registrants):", results);
                        resolve(results);
                    }
                });
            });
    
            const countQuery = "SELECT COUNT(*) AS Series_Count FROM events JOIN series ON events.Event_ID = series.Event_ID WHERE events.Event_ID = ?";
            const countResults = await new Promise((resolve, reject) => {
                connection.query(countQuery, [a], (err, results) => {
                    if (err) {
                        console.error('Error executing query:', err);
                        reject(new Error(err.message));
                    } else {
                        console.log('Execution successful(SeriesCount). Count:', results[0].Series_Count);
                        resolve(results);
                    }
                });
            });
    
            const count = countResults[0].Series_Count;
    
            console.log("NameS:", response);
            makeSeriesRecord(a, response, count);
            return response;
        } catch (error) {
            console.log(error + ' Fetching registrants from DB failed.');
        }
    }
    

    
}

function makeRecord(ID, names){
    const insertQuery = "SELECT COUNT(*) AS row_count FROM webdev.attendance WHERE Event_ID = ?"
    connection.query(insertQuery , [ID], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
        } else {
            console.log('Execution successful (MR). Count:', results[0].row_count);
            if (results[0].row_count == 0){
                const userIDs = names.map(row => row.User_ID);
                console.log("USER IDs: ", userIDs);
                userIDs.forEach(userID =>{
                    const insertQuery = "INSERT INTO webdev.attendance (Event_ID, User_ID) VALUES (?, ?)"
                    connection.query(insertQuery , [ID, userID], (err, results) => {
                        if (err) {
                            console.error('Error executing INSERT query:', err);
                        } else {
                            console.log('Attendance Record creation successful. Rows affected:', results.affectedRows);
                        }
                    })
                })
            }
        }
    })
}


function makeSeriesRecord(ID, names, count){
    console.log("nAMEs:", names)
    const countQuery = "SELECT COUNT(*) AS row_count FROM webdev.attendance WHERE Event_ID = ?"
    connection.query(countQuery , [ID], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
        } else {
            console.log('Execution successful (MSR). Count:', results[0].row_count);
            if (results[0].row_count == 0){
                const userIDs = names.map(row => row.User_ID);
                console.log("USER IDs: ", userIDs);
                console.log("No. of series: ", count)
                console.log("Event ID: ", ID)
                const values = []
                for (var j = 1; j <= count; j++){
                    for (var k = 0; k < userIDs.length; k++){
                        values.push([j, ID, userIDs[k]])
                    }
                }
                
                console.log(values)
                values.forEach(value => {recordQuery(value)})
            }
        }
    })
}


function recordQuery(val){
    const insertQuery = "INSERT INTO webdev.attendance (Series_Num, Event_ID, User_ID) VALUES (?, ?, ?)"
    connection.query(insertQuery , [val[0], parseInt(val[1],10), val[2]], (err, results) => {
        if (err) {
            console.error('Error executing INSERT query:', err);
        } else {
            console.log('Attendance Record creation successful (Series). Rows affected:', results.affectedRows);
        }
    })
}


module.exports = DbService;