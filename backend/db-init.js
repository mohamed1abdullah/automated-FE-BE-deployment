const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');

const dbFile = path.join(__dirname, 'db', 'data.db');
const seedFile = path.join(__dirname, 'db', 'seed.sql');

console.log('Opening database for seeding...');
const db = new sqlite3.Database(dbFile);

console.log('Reading seed file...');
const seedSQL = fs.readFileSync(seedFile, 'utf-8');

console.log('Executing seed SQL...');
db.exec(seedSQL, (err) => {
  if (err) {
    console.error('Error seeding DB:', err);
  } else {
    console.log('Database seeded successfully.');
  }
  db.close();
});
