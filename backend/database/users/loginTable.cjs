const db = require("./DatabaseConnector.cjs")

module.exports = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Database error'});
    }

    if (results.length > 0) {
      const user = results[0];
      req.session.user = {
        username : user.username
      }
      res.status(200).json({message: "Success", username: user.username});
      

    } else {
      res.status(200).json({ message: 'Invalid credentials' });
    }
  });
  
};

