const express = require("express")
const path = require("path")
const router = express.Router()

router.get(`/login`, (req, res) => {
  if (!req.session.user) {
    res.sendFile(path.join(__dirname,'..','..', 'privatePage', 'loginForm.html'));
  } else {
    res.redirect('/home.html');
  }
});
router.get(`/signup`, (req, res) => {
  if (!req.session.user) {
    res.sendFile(path.join(__dirname,'..','..', 'privatePage', 'signupForm.html'));
  } else {
    res.redirect('/home.html');
  }
});

module.exports = router;