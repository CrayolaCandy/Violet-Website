const express = require("express");
const path = require("path");
const router = express.Router();
const db = require("../database/users/DatabaseConnector.cjs");

// GET route to return user's profile image
router.get("/user/profileImage/:username", (req, res) => {
  const username = req.params.username.trim();
  const sql = "SELECT profileImage FROM userProfile WHERE username = ?";
  
  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send("Server error");
    }

    if (result.length === 0 || !result[0].profileImage) {
      const defaultPath = path.join(__dirname, "../../../images/defaultUser3.png");
      return res.sendFile(defaultPath);
    }

    const image = result[0].profileImage;

    res.status(200)
       .setHeader("Content-Type", "image/jpeg") // or "image/png"
       .send(image);
  });
});

module.exports = router;
