const db = require("./DatabaseConnector.cjs");

// Helper to promisify db.query
function queryAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = async (req, res) => {
  try {
    const { oldUsername, username, password, email, IGN, IGNPass } = req.body;

    // Check if new username already exists (and is not the old one)
    const existingUsers = await queryAsync(`SELECT * FROM login WHERE username = ?`, [username]);
    if (existingUsers.length > 0 && username !== oldUsername) {
      return res.status(400).json({ message: "This Username is Already Taken" });
    }

    // Get old user info by oldUsername
    const oldUsers = await queryAsync(`SELECT * FROM login WHERE username = ?`, [oldUsername]);
    if (oldUsers.length === 0) {
      return res.status(404).json({ message: "Old username not found" });
    }

    const userID = oldUsers[0].id;

    // Update login table
    await queryAsync(
      `UPDATE login SET username = ?, password = ?, email = ? WHERE id = ?`,
      [username, password, email, userID]
    );

    // Update userProfile table
    await queryAsync(
      `UPDATE userProfile SET username = ?, mcname = ?, mcpass = ? WHERE userid = ?`,
      [username, IGN, IGNPass, userID]
    );

    // Update Username in textMessages
    await queryAsync(
      'UPDATE chatMessage SET username = ? WHERE username = ?',
      [username, oldUsername]
    )

    // Update other tables
    const tablesToUpdate = ["bountyOrder", "statOrder", "currencyOrder"];
    const updatePromises = tablesToUpdate.map(table =>
      queryAsync(`UPDATE ?? SET username = ? WHERE userid = ?`, [table, username, userID])
    );

    await Promise.all(updatePromises);

    // Update session user
    req.session.user = req.session.user || {};
    req.session.user.username = username;

    req.session.save(err => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ message: "Failed to save session" });
      }
      return res.status(200).json({ message: "Profile updated successfully", result: username });
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
