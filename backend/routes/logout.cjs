const express = require("express")
const router = express.Router()

router.post('/user/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Failed to destroy session:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('Key'); 
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;