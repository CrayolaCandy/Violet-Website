const db = require("../users/DatabaseConnector.cjs")

module.exports = (req, res) => {
  const { username, bedMode, bedDestroy, finalKill, winStreak, win } = req.body;

  const sql = 
  `
  INSERT INTO statOrder (username, bedMode, bedDestroy, finalKill, winStreak, win) VALUES (?,?,?,?,?,?)
  `;
  db.query(sql, [username, bedMode, bedDestroy, finalKill, winStreak, win], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Database error'});
    }
    else{
      res.status(201).json({ message: "Order Placed", orderid: results.insertId});
    }
  });
  
};

