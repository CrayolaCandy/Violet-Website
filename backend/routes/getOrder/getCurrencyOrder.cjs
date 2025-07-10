const db = require("../../database/users/DatabaseConnector.cjs");

module.exports = function getCurrencyOrder(username) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CurrencyOrder WHERE username = ?";
    db.query(sql, [username], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
