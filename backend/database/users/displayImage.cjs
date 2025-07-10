const db = require('./DatabaseConnector.cjs');
const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/profileImage/:username', (req, res) => {
  const username = req.params.username;

  const findImage = `
    SELECT imageName FROM userProfile WHERE username = ?
  `;

  db.query(findImage, [username], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    // If user not found or imageName is missing
    if (result.length === 0 || !result[0].imageName) {
      const defaultPath = path.join(__dirname, '../userImage/Guest.jpg');
      return res.sendFile(defaultPath);
    }

    const imagePath = path.join(__dirname, `../userImage/${result[0].imageName}`);
    return res.sendFile(imagePath);
  });
});

module.exports = router;
