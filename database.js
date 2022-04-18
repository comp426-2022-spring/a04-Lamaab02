const database = require('better-sqlite3')

const logdb = new database('log.db')

const stmt = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='access';`)
let row = stmt.get();
if(row === undefined){

console.log('Log database appears to be missing. creating log database')
const sqlInit = `
    CREATE TABLE acceess ( id  INTEGER PRIMARY KEY, remote-addr VARCHAR, remote-user VARCHAR, datetime VARCHAR, method VARCHAR, url VARCHAR, http-version NUMERIC, status INTEGER, content-length NUMERIC )
`
logdb.exec(sqlInit)
} else {
    console.log('Log database exists.')
}

module.exports = logdb