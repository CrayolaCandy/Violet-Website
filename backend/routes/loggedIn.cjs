const express = require("express")
const router = express.Router();

function loggedIn(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: 'You must be logged in' });
  }
  next();
}
router.get('/user/checkLog', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = {router, loggedIn}