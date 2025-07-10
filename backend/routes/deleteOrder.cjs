const db = require('../database/users/DatabaseConnector.cjs')

module.exports = (req, res) => {
  console.log("🔍 DELETE route hit:", req.body); // Log this!
  const { orderID, orderType } = req.body;

  if (!orderID || !orderType) {
    return res.status(400).json({ message: "Missing orderID or orderType" });
  }

  const tableMap = {
    Stat: "statOrder",
    Bounty: "bountyOrder",
    Currency: "currencyOrder"
  };

  const table = tableMap[orderType];
  if (!table) {
    return res.status(400).json({ message: "Invalid orderType" });
  }

  const sql = `DELETE FROM ${table} WHERE orderid = ?`;
  db.query(sql, [orderID], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "No matching order found" });
    }

    return res.status(200).json({ message: "Delete successful" });
  });
};

