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
    
}

module.exports = DbService;