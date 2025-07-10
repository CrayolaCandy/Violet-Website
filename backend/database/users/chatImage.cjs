const db = require("./DatabaseConnector.cjs");
const express = require("express");
const router = express.Router();
const path = require("path");

router.get('/chatImage/:username', (req, res) => {
  const username = req.params.username;

  // ✅ Step 0: Sanity check
  if (!username || username === "null" || username === "undefined") {
    const defaultPath = path.join(__dirname, '../userImage/Guest.jpg');
    return res.sendFile(defaultPath);
  }

  // ✅ Step 1: Check if the user posted any message
  const getUsername = `
    SELECT username FROM chatMessage WHERE username = ?
    LIMIT 1
  `;

  db.query(getUsername, [username], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (result.length === 0) {
      // ❌ User never posted before
      const defaultPath = path.join(__dirname, '../userImage/Guest.jpg');
      return res.sendFile(defaultPath);
    }

    // ✅ Step 2: Get user image from userProfile
    const fetchImage = `
      SELECT imageName FROM userProfile WHERE username = ?
    `;

    db.query(fetchImage, [username], (err, imageResult) => {
      if (err) return res.status(500).json({ message: 'Database error' });

      if (imageResult.length === 0 || !imageResult[0].imageName) {
        const defaultPath = path.join(__dirname, '../userImage/Guest.jpg');
        return res.sendFile(defaultPath);
      }

      const imagePath = path.join(__dirname, `../userImage/${imageResult[0].imageName}`);
      return res.sendFile(imagePath);
    });
  });
});
module.exports = router
