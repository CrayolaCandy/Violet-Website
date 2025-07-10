const db = require("../users/DatabaseConnector.cjs")

module.exports = (req, res) => {
  const { username, target, amount } = req.body;

  const sql = 
  `
  INSERT INTO bountyOrder (username, target, amount) VALUES (?,?,?)
  `;
  db.query(sql, [username, target, amount], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Database error'});
    }
    else{
      res.status(201).json({ message: "Order Placed", orderid: results.insertId});
    }
  });
  
};

