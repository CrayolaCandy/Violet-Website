const db = require("./DatabaseConnector.cjs")

module.exports = (req, res) =>{
  const {getID, username, newMessageID, userInput} = req.body
  const sql = 
  `
    Insert into chatMessage (chatid, chatmessageid, username, message) VALUES (?, ?, ?, ?)
  `
  db.query(sql, [getID, newMessageID, username, userInput], (err, messageResult) =>{
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.status(201).json({message: "New Message Inserted"})
  })
}