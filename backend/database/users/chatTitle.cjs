const express = require("express");
const router = express.Router();
const db = require('./DatabaseConnector.cjs');

router.get("/users/chatList", (req, res) => {
  const sql = `SELECT * FROM chatTitle`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

module.exports = router;
