const db = require("./DatabaseConnector.cjs");

module.exports = (req, res) => {
  const { username, password, email, mcName, mcPass } = req.body;

  const sql = "SELECT * FROM login WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      return res.status(200).json({ message: "Username Already Exist" });
    } else {
      const insertLogin = "INSERT INTO login (username, password, email) VALUES (?, ?, ?)";
      db.query(insertLogin, [username, password, email], (err, loginResult) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res.status(500).json({ message: "Failed to register user" });
        }
        const userID = loginResult.insertId
        const insertProfile = 
        `
        INSERT INTO userProfile ( userid, username, imageName, mcname, mcpass) VALUES (?, ?, NULL, ?, ?)
        `
        db.query(insertProfile, [userID, username, mcName, mcPass], (err, profileResult) => {
          if (err) {
            console.error("Error creating profile:", err);
            return res.status(500).json({ message: "Failed to create profile" });
          }

          return res.status(201).json({
            message: "User and profile registered successfully",
            userid: loginResult.insertId
          });
        });
      });
    }
  });
};
