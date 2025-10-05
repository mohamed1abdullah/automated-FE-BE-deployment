const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbFile = path.join(__dirname, 'db', 'data.db');

console.log('Database file path:', dbFile);

const db = new sqlite3.Database(dbFile, (err)=>{
if(err) console.error('DB open error', err);
});


module.exports = db;