const db = require("./DatabaseConnector.cjs")
const express = require("express")
const router = express.Router()

router.delete('/deleteMessage', (req, res) =>{
  const {username, chatmessageid} = req.body
  const deleteChat = 
  `
    DELETE from chatMessage
    WHERE username = ? AND chatmessageid = ?
  `
  db.query(deleteChat, [username, chatmessageid], (err, results) =>{
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if(results.affectedRows === 0){
      return res.status(404).json({message: "No matching text id"})
    }
    return res.status(200).json({ message: "Delete successful" });
  })
})
module.exports = router;