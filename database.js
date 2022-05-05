"use strict";

const database = require('better-sqlite3')
const { appendFile } = require('fs');
const logdb = new database('log.db')

const stmt = logdb.prepare(`
SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`)

let row = stmt.get();

if(row === undefined){
    console.log('Log database appears to be missing. creating log database')
    const sqlInit =`       
        CREATE TABLE accesslog (
        accesslogid INTEGER PRIMARY KEY, 
        remoteaddr TEXT, 
        remoteuser TEXT, 
        time TEXT, 
        method TEXT, 
        url TEXT, 
        protocol TEXT,
        httpversion TEXT, 
        status TEXT, 
        referer TEXT,
        useragent TEXT
    );`
    logdb.exec(sqlInit)
} else {
    console.log('database exists.')
}

module.exports = logdb