const db = require("./DatabaseConnector.cjs");
const express = require("express");
const router = express.Router();

router.get('/users/chatMessages/:chatID', (req, res) => {
  const { chatID } = req.params;

  const sql = `SELECT * FROM chatMessage WHERE chatid = ?`;

  db.query(sql, [chatID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No messages found for this chatID' });
    }

    const getTitle = `SELECT * FROM chatTitle WHERE id = ?`;

    db.query(getTitle, [chatID], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'No chat title found for this chatID' });
      }

      res.json({
        title: results[0],  // send only the object, not the array
        messages: result
      });
    });
  });
});

module.exports = router;
