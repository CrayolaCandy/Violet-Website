const db = require("./DatabaseConnector.cjs");
const express = require("express");
const router = express.Router();

router.post("/updateMessage", (req, res) => {
  const { chatID, chatmessageid, newMessage } = req.body;

  const updateSQL = `
    UPDATE chatMessage
    SET message = ?
    WHERE chatID = ? AND chatmessageid = ?
  `;

  db.query(updateSQL, [newMessage, chatID, chatmessageid], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Message not found or no change" });
    }

    res.status(200).json({ message: "Message updated successfully" });
  });
});

module.exports = router;
