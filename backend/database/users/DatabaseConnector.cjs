const mysql = require('mysql2');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Jonathan4682',
  database: 'WebAccount',
  port: 3307
});

module.exports = db;

