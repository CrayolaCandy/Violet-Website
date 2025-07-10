const express = require("express");
const router = express.Router();
const fetch = (...args) => import("node-fetch").then(mod => mod.default(...args));

router.post("/player/skin", (req, res) => {
  const username = req.body.username;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
    .then(response => {
      if (!response.ok) {
        return res.status(404).json({ error: "User not found" });
      }
      return response.json(); // parse response
    })
    .then(data => {
      if (data.error) {
        return res.status(404).json({ error: "Player not found" });
      }

      // Only send plain data
      return res.json({
        id: data.id,
        name: data.name
      });
    })
    .catch(err => {
      console.error("Error fetching player data:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Internal server error" });
      }
    });
});

module.exports = router;
