const db = require("./DatabaseConnector.cjs");

module.exports = (req, res) => {
  const { username } = req.body;

  const sql = `
  SELECT 
    login.username,
    login.email,
    login.password,
    userProfile.mcname,
    userProfile.mcpass
  FROM login
  JOIN userProfile ON login.id = userProfile.userid
  WHERE login.username = ?;
`;

db.query(sql, [username], (err, results) => {
  if (err) {
    console.error("Error executing query:", err);
    return res.status(500).json({ message: "Database error" });
  }

  if (results.length > 0) {
    return res.status(200).json({
      message: "Data retrieved",
      user: results[0]
    });
  } else {
    return res.status(404).json({ message: "User not found", results: results.insertId});
  }
});


};
