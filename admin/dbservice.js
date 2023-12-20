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

    async searchEvent(Event_Name) {
        let response;
        try {
            response = await new Promise ((resolve, reject) => {
                const query = "SELECT * FROM webdev.events WHERE Event_Name LIKE ?"
                connection.query(query, [`%${Event_Name}%`], (err, results) => {
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

    async verifyUser(username, password) {
        let response;
        try {
            const query = "SELECT * FROM webdev.admin WHERE Admin_ID = ? AND Password = ?"
            const results = await new Promise((resolve, reject) => {
                connection.query(query, [username, password], (err, results) => {
                    if (err) {
                        reject(new Error (err.message))
                    } else {
                        console.log("Fethed data from DB: ", results)
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
                const query = "INSERT INTO webdev.events (Event_ID, Event_Name, Event_Tagline, Event_Description, Event_StartDate, Event_EndDate, Event_Type, isOpen, isPublic, Evaluation_Link, External_Regis) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
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

    async changeLive(a){
        let response
        try {
            const lastID = await this.lastEventID();
            let eventID = `${lastID[0].Event_ID}`
            console.log("event id: ", eventID)
            response = await new Promise ((resolve, reject) => {
                const query = "UPDATE webdev.events SET isLive = ? WHERE Event_Id = ?"
                connection.query(query, [a, eventID],(err, results) => {
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
            console.log(error + ' Changing live status failed.')
    
        }
    }

    async oneTime(a, b){
        let response
        try {
            const lastID = await this.lastEventID();
            let eventID = `${lastID[0].Event_ID}`
            console.log("event id: ", eventID)
            response = await new Promise ((resolve, reject) => {
                const query = "INSERT INTO webdev.onetime (Event_ID, Start_Time, End_Time) VALUES (?, ?, ?)"
                connection.query(query, [eventID, a, b],(err, results) => {
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
    
    async amPM(a, b, c, d){
        let response
        try {
            const lastID = await this.lastEventID();
            let eventID = `${lastID[0].Event_ID}`
            console.log("event id: ", eventID)
            response = await new Promise ((resolve, reject) => {
                const query = "INSERT INTO webdev.ampm (Event_ID, AM_Start, AM_End, PM_Start, PM_End) VALUES (?, ?, ?, ?, ?)"
                connection.query(query, [eventID, a, b, c, d],(err, results) => {
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

    async series(a, b, c){
        let response
        try {
            const lastID = await this.lastEventID();
            let eventID = `${lastID[0].Event_ID}`
            console.log("event id: ", eventID)
            response = await new Promise ((resolve, reject) => {
                const query = "INSERT INTO webdev.series (Event_ID, Series_Num, Start_Time, End_Time) VALUES (?, ?, ?, ?)"
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
    
    
}

module.exports = DbService;