const session = require("express-session")
const MySQLStore = require('express-mysql-session')(session);


const dbOptions = {
  host: 'localhost',
  user: 'root',
  password: 'Jonathan4682',
  database: 'WebAccount',
  port: 3307
};

const sessionStore = new MySQLStore(dbOptions);

const sessionMiddleware = (session({
  key: 'session_cookie_name',  // optional, default is 'connect.sid'
  secret: 'Key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,  // 1 day
    sameSite: 'lax',              // adjust if needed
    secure: false                 // set true if using HTTPS
  }
}));

module.exports = sessionMiddleware;