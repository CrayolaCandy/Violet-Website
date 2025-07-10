const db = require("./DatabaseConnector.cjs");
const multer = require("multer");
const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// 1. Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../userImage"));
  },
  filename: function (req, file, cb) {
    const username = req.body.username;
    const ext = path.extname(file.originalname);
    const fileName = `${username}ProfileImage${ext}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

// 2. Route for uploading image and replacing old one
router.post('/uploadImage', upload.single('image'), (req, res) => {
  const username = req.body.username;
  const newImageName = req.file.filename;

  // Fetch old image name
  const sql = `SELECT imageName FROM userProfile WHERE username = ?`;
  db.query(sql, [username], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    const oldImage = result[0]?.imageName;
    if (oldImage && oldImage !== newImageName) {
      const oldPath = path.join(__dirname, '../userImage', oldImage);
      fs.unlink(oldPath, (err) => {
        if (err && err.code !== 'ENOENT') {
          console.error("Failed to delete old image:", err);
        }
      });
    }

    // Update DB with new image name
    const updateSql = `
      UPDATE userProfile
      SET imageName = ?
      WHERE username = ?
    `;
    db.query(updateSql, [newImageName, username], (err) => {
      if (err) return res.status(500).json({ message: 'Failed to update DB' });
      res.json({ message: 'Image uploaded and DB updated', filename: newImageName });
    });
  });
});

module.exports = router;



/* 
const storeImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../userImage'));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storeImage });

router.post('/uploadImage', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filename = req.file.filename;
  const { username } = req.body;

  const sql = `
    UPDATE userProfile
    SET imageName = ?
    WHERE username = ?
  `;

  db.query(sql, [filename, username], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: 'Upload + DB update successful', filename });
  });
});
*/
//module.exports = router;
